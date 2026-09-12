import { User } from "@/backend/modules/auth/user.model";
import { connectToDatabase } from "@/backend/config/db";

// Fallback mocks in case packages are missing during initial build
let stripe: any = null;
let Razorpay: any = null;
try {
  const Stripe = require("stripe").default || require("stripe");
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock", {
    apiVersion: "2023-10-16",
  });
} catch {}

try {
  const Rzp = require("razorpay");
  Razorpay = new Rzp({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_mock",
    key_secret: process.env.RAZORPAY_SECRET || "mock",
  });
} catch {}

const PLANS = {
  pro: {
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID || "price_pro_mock",
    razorpayPlanId: process.env.RAZORPAY_PRO_PLAN_ID || "plan_pro_mock",
    inrPrice: 499,
  },
  team: {
    stripePriceId: process.env.STRIPE_TEAM_PRICE_ID || "price_team_mock",
    razorpayPlanId: process.env.RAZORPAY_TEAM_PLAN_ID || "plan_team_mock",
    inrPrice: 1999,
  },
};

export class BillingService {
  /**
   * Dynamically generates a checkout session based on user location/preference.
   */
  static async createCheckout(
    userId: string,
    planId: "pro" | "team",
    currency: "USD" | "INR"
  ) {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    if (currency === "INR") {
      if (!Razorpay) throw new Error("Razorpay not installed or configured");
      
      // Razorpay Subscription Creation
      const subscription = await Razorpay.subscriptions.create({
        plan_id: PLANS[planId].razorpayPlanId,
        customer_notify: 1,
        total_count: 12, // Annual
      });

      // Map subscription to user
      user.subscriptionId = subscription.id;
      user.plan = planId;
      await user.save();

      return {
        provider: "razorpay",
        subscriptionId: subscription.id,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID,
        amount: PLANS[planId].inrPrice * 100, // Paise
        currency: "INR",
        user: {
          name: user.name,
          email: user.email,
        },
      };
    } else {
      if (!stripe) throw new Error("Stripe not installed or configured");

      // Stripe Checkout Session Creation
      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
          metadata: { userId: user._id.toString() },
        });
        customerId = customer.id;
        user.stripeCustomerId = customerId;
        await user.save();
      }

      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
          {
            price: PLANS[planId].stripePriceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
        metadata: { userId: user._id.toString(), planId },
      });

      return {
        provider: "stripe",
        url: session.url,
      };
    }
  }

  /**
   * Generates Stripe Customer Portal (Self-serve billing)
   */
  static async createPortalSession(userId: string) {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user || !user.stripeCustomerId) {
      throw new Error("No active Stripe customer found for this user.");
    }
    if (!stripe) throw new Error("Stripe not installed");

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
    });

    return { url: session.url };
  }

  /**
   * Processes verified Stripe Webhook events
   */
  static async handleStripeWebhook(event: any) {
    await connectToDatabase();
    
    if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.created") {
      const subscription = event.data.object;
      const customerId = subscription.customer as string;
      const status = subscription.status; // active, past_due, canceled
      const currentPeriodEnd = new Date(subscription.current_period_end * 1000);

      await User.findOneAndUpdate(
        { stripeCustomerId: customerId },
        { 
          planStatus: status, 
          subscriptionId: subscription.id,
          currentPeriodEnd 
        }
      );
    } else if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      const customerId = subscription.customer as string;
      await User.findOneAndUpdate(
        { stripeCustomerId: customerId },
        { 
          plan: "free", 
          planStatus: "canceled" 
        }
      );
    }
  }

  /**
   * Processes verified Razorpay Webhook events
   */
  static async handleRazorpayWebhook(event: any) {
    await connectToDatabase();
    
    if (event.event === "subscription.charged") {
      const subscription = event.payload.subscription.entity;
      
      const subId = subscription.id;
      const currentPeriodEnd = new Date(subscription.current_end * 1000);

      await User.findOneAndUpdate(
        { subscriptionId: subId },
        { 
          planStatus: "active",
          currentPeriodEnd 
        }
      );
    } else if (event.event === "subscription.cancelled") {
      const subscription = event.payload.subscription.entity;
      await User.findOneAndUpdate(
        { subscriptionId: subscription.id },
        { 
          plan: "free", 
          planStatus: "canceled" 
        }
      );
    }
  }
}

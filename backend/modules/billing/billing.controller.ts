import { NextRequest, NextResponse } from "next/server";
import { BillingService } from "./billing.service";
import { apiHandler } from "@/backend/shared/utils/apiHandler";

export class BillingController {
  static handleCreateCheckout = apiHandler(async (req: NextRequest, userId?: string | null) => {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { planId, currency } = body; // currency: "USD" | "INR"

    if (!planId || (planId !== "pro" && planId !== "team")) {
      return NextResponse.json({ error: "Invalid planId" }, { status: 400 });
    }

    const session = await BillingService.createCheckout(userId, planId, currency || "USD");
    return NextResponse.json({ success: true, session });
  });

  static handleCreatePortal = apiHandler(async (_req: NextRequest, userId?: string | null) => {
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const portal = await BillingService.createPortalSession(userId);
    return NextResponse.json({ success: true, url: portal.url });
  });

  static handleStripeWebhook = apiHandler(async (req: NextRequest) => {
    const body = await req.json();
    await BillingService.handleStripeWebhook(body);
    return NextResponse.json({ received: true });
  });

  static handleRazorpayWebhook = apiHandler(async (req: NextRequest) => {
    const body = await req.json();
    await BillingService.handleRazorpayWebhook(body);
    return NextResponse.json({ status: "ok" });
  });
}

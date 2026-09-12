"use client";

import React, { useState } from "react";
import { Check, Loader2, Sparkles, Zap, Shield, Globe } from "lucide-react";
import { useRouter } from "next/navigation";
import Script from "next/script";

// Extend window object to include razorpay (for TypeScript)
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PlanCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
  onSelect: () => void;
  loading: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({
  name,
  price,
  period,
  description,
  features,
  isPopular,
  buttonText,
  onSelect,
  loading,
}) => {
  return (
    <div
      className={`relative flex flex-col p-6 rounded-[24px] bg-white border ${
        isPopular ? "border-[#2c35af] shadow-lg scale-100 sm:scale-105 z-10" : "border-[#e7e5dc] shadow-sm"
      }`}
    >
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#2c35af] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
          <Sparkles className="w-3 h-3" /> Most Popular
        </div>
      )}

      <div className="mb-5">
        <h3 className="text-sm font-black uppercase tracking-wider text-[#121316] mb-2">
          {name}
        </h3>
        <p className="text-xs text-zinc-500 font-medium h-8">{description}</p>
      </div>

      <div className="mb-6 flex items-end gap-1">
        <span className="text-4xl font-black text-[#121316] leading-none tracking-tight">
          {price}
        </span>
        <span className="text-xs font-bold text-zinc-400 mb-1">{period}</span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <div className="w-4 h-4 rounded-full bg-[#f5f4ef] flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-2.5 h-2.5 text-[#2c35af]" />
            </div>
            <span className="text-xs font-semibold text-zinc-600 leading-snug">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        disabled={loading}
        className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 ${
          isPopular
            ? "bg-[#2c35af] text-white hover:bg-[#202681] shadow-md"
            : "bg-[#f5f4ef] text-[#121316] hover:bg-[#e7e5dc]"
        }`}
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : buttonText}
      </button>
    </div>
  );
};

export const PricingTable: React.FC = () => {
  const [currency, setCurrency] = useState<"USD" | "INR">("INR");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const router = useRouter();

  const handleCheckout = async (planId: "pro" | "team") => {
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, currency }),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Checkout failed");
        setLoadingPlan(null);
        return;
      }

      if (data.session.provider === "stripe") {
        window.location.href = data.session.url;
      } else if (data.session.provider === "razorpay") {
        const options = {
          key: data.session.key,
          subscription_id: data.session.subscriptionId,
          name: "SnapLink.to",
          description: `Upgrade to ${planId.toUpperCase()}`,
          image: "https://yourlogo.com/logo.png",
          handler: function (response: any) {
            router.push("/dashboard/billing?success=true");
          },
          prefill: {
            name: data.session.user.name,
            email: data.session.user.email,
          },
          theme: {
            color: "#2c35af",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoadingPlan(null);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to initiate checkout");
      setLoadingPlan(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4">
      {currency === "INR" && (
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      )}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-black text-[#121316] uppercase tracking-tight mb-3">
          Scale Your Audience
        </h2>
        <p className="text-sm font-medium text-zinc-500 max-w-xl mx-auto mb-8">
          Start for free, upgrade when you need custom domains, team collaboration, and deep analytics.
        </p>

        {/* Currency Toggle */}
        <div className="inline-flex items-center p-1 bg-white border border-[#e7e5dc] rounded-xl shadow-xs">
          <button
            onClick={() => setCurrency("INR")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              currency === "INR" ? "bg-[#f5f4ef] text-[#121316] shadow-sm" : "text-zinc-500 hover:text-black"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            INR (India)
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              currency === "USD" ? "bg-[#f5f4ef] text-[#121316] shadow-sm" : "text-zinc-500 hover:text-black"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            USD (Global)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
        {/* FREE PLAN */}
        <PlanCard
          name="Free"
          price={currency === "INR" ? "₹0" : "$0"}
          period="/month"
          description="Everything you need to get started."
          features={[
            "Unlimited Short Links",
            "Basic Link-in-Bio",
            "7-Day Analytics History",
            "Standard QR Codes",
          ]}
          buttonText="Current Plan"
          onSelect={() => {}}
          loading={false}
        />

        {/* PRO PLAN */}
        <PlanCard
          name="Pro Creator"
          price={currency === "INR" ? "₹499" : "$9"}
          period="/month"
          description="For creators who want to own their brand."
          isPopular={true}
          features={[
            "1 Custom Domain",
            "Premium Bio Themes",
            "1-Year Analytics History",
            "Facebook/Google Pixel Retargeting",
            "Remove 'Powered by' badge",
          ]}
          buttonText="Upgrade to Pro"
          onSelect={() => handleCheckout("pro")}
          loading={loadingPlan === "pro"}
        />

        {/* TEAM PLAN */}
        <PlanCard
          name="Enterprise Team"
          price={currency === "INR" ? "₹1,999" : "$29"}
          period="/month"
          description="For agencies and brands."
          features={[
            "Up to 10 Custom Domains",
            "Unlimited Team Members",
            "SSO / SAML Login",
            "Export Analytics Data (CSV)",
            "Dedicated Account Manager",
          ]}
          buttonText="Upgrade to Team"
          onSelect={() => handleCheckout("team")}
          loading={loadingPlan === "team"}
        />
      </div>

      {currency === "INR" && (
        <p className="text-center text-[10px] font-bold text-zinc-400 uppercase mt-8 tracking-widest">
          Secure payments powered by Razorpay
        </p>
      )}
      {currency === "USD" && (
        <p className="text-center text-[10px] font-bold text-zinc-400 uppercase mt-8 tracking-widest">
          Secure payments powered by Stripe
        </p>
      )}
    </div>
  );
};

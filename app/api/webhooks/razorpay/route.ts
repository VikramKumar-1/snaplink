import { NextRequest } from "next/server";
import { BillingController } from "@/backend/modules/billing/billing.controller";

export async function POST(req: NextRequest) {
  return BillingController.handleRazorpayWebhook(req);
}

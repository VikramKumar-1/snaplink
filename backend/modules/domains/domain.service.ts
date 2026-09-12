import crypto from "crypto";
import { promises as dns } from "dns";
import { DomainRepository } from "./domain.repository";
import { CreateDomainSchema } from "./domain.validator";
import { IDomain, DomainStatus } from "./domain.model";
import { checkRateLimit } from "@/backend/shared/middlewares/rateLimiter";

export class DomainService {
  /**
   * Registers a new custom domain and issues DNS verification credentials
   */
  static async createDomain(rawBody: any, userId?: string | null, ip: string = "unknown"): Promise<IDomain> {
    const rateCheck = checkRateLimit(ip, "CREATE_DOMAIN");
    if (!rateCheck.allowed) {
      const err: any = new Error(rateCheck.message || "Too many requests");
      err.statusCode = 429;
      throw err;
    }

    const validated = CreateDomainSchema.parse(rawBody);
    const domain = validated.domain.toLowerCase();

    const existing = await DomainRepository.findByDomain(domain);
    if (existing) {
      const err: any = new Error("This domain is already registered in the system.");
      err.statusCode = 409;
      throw err;
    }

    const verificationToken = `snaplink-verify-${crypto.randomBytes(8).toString("hex")}`;
    const targetCname = "cname.snaplink.to";

    const newDomain = await DomainRepository.create({
      domain,
      verificationToken,
      targetCname,
      defaultRedirectUrl: validated.defaultRedirectUrl || "",
      status: "pending_dns",
      sslStatus: "active",
      ...(userId && { userId: userId as any }),
    });

    return newDomain;
  }

  /**
   * Queries public DNS records (CNAME & TXT) to verify domain ownership
   */
  static async verifyDomain(domainId: string, userId?: string | null, ip: string = "unknown") {
    const rateCheck = checkRateLimit(ip, "VERIFY_DOMAIN");
    if (!rateCheck.allowed) {
      const err: any = new Error(rateCheck.message || "Too many requests");
      err.statusCode = 429;
      throw err;
    }

    const domain = await DomainRepository.findById(domainId);
    if (!domain) {
      const err: any = new Error("Domain not found.");
      err.statusCode = 404;
      throw err;
    }

    if (domain.userId && String(domain.userId) !== String(userId)) {
      const err: any = new Error("Forbidden: You do not own this domain.");
      err.statusCode = 403;
      throw err;
    }

    let isVerified = false;
    let diagnostic = "";

    // Dev/Test simulation or test domains (.test, .local, or simulation header)
    if (domain.domain.endsWith(".test") || domain.domain.endsWith(".local")) {
      isVerified = true;
      diagnostic = "Verified via local testing delegation.";
    } else {
      // 1. Check CNAME record
      try {
        const cnameRecords = await dns.resolveCname(domain.domain);
        if (
          cnameRecords.some((rec) =>
            rec.toLowerCase().includes("snaplink") || rec.toLowerCase().includes("cname.snaplink.to")
          )
        ) {
          isVerified = true;
          diagnostic = "CNAME record confirmed pointing to cname.snaplink.to.";
        }
      } catch (cnameErr: any) {
        diagnostic = `CNAME lookup: ${cnameErr.code || "Not detected"}. `;
      }

      // 2. Check TXT verification record if CNAME not resolved
      if (!isVerified) {
        try {
          const txtRecords = await dns.resolveTxt(domain.domain);
          const flatTxt = txtRecords.flat().join(" ");
          if (flatTxt.includes(domain.verificationToken)) {
            isVerified = true;
            diagnostic = "TXT verification record confirmed.";
          }
        } catch (txtErr: any) {
          diagnostic += `TXT lookup: ${txtErr.code || "Not detected"}.`;
        }
      }
    }

    const newStatus: DomainStatus = isVerified ? "verified" : "pending_dns";
    const updated = await DomainRepository.updateStatus(domainId, newStatus, new Date());

    return {
      success: isVerified,
      domain: updated,
      message: isVerified
        ? "Domain successfully verified! CNAME routing is now active."
        : `DNS records have not propagated yet. ${diagnostic} Please wait a few minutes after updating your DNS provider.`,
    };
  }

  /**
   * Fetches all domains belonging to the authenticated user
   */
  static async getUserDomains(userId?: string | null): Promise<any[]> {
    if (!userId) return [];
    return await DomainRepository.findByUserId(userId);
  }

  /**
   * Deletes a domain
   */
  static async deleteDomain(domainId: string, userId?: string | null): Promise<boolean> {
    const existing = await DomainRepository.findById(domainId);
    if (!existing) {
      const err: any = new Error("Domain not found.");
      err.statusCode = 404;
      throw err;
    }

    if (existing.userId && String(existing.userId) !== String(userId)) {
      const err: any = new Error("Forbidden: You do not own this domain.");
      err.statusCode = 403;
      throw err;
    }

    return await DomainRepository.deleteById(domainId, userId);
  }
}

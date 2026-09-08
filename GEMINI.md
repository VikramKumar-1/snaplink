# 🏛️ PROJECT CODING CONSTITUTION & ARCHITECTURAL LAW

> **CRITICAL DIRECTIVE:**
> Every AI agent working on this repository MUST read and enforce this file before modifying or creating any code.
> Act with the mindset and precision of a **Principal Staff Full-Stack Software Engineer (15+ Years Experience)**.

---

## 🚫 The 5 Golden Backend Laws

1. **`app/api/.../route.ts` is ONLY Router Glue (2-3 Lines Max):**
   - No Mongoose queries. No business logic. No bcrypt/JWT operations.
   - Simply call `DomainController.handleMethod(req)`.

2. **Skinny Controllers (Laravel Style):**
   - Every controller method MUST be wrapped with `apiHandler(...)`.
   - Never write manual `try/catch` inside controllers.
   - Controllers only parse HTTP, invoke Services, manage cookies, and return `NextResponse.json(...)`.

3. **Services Contain ALL Business Logic:**
   - Zod validation (`Schema.parse(...)`), password hashing, platform detection, rate-limit checks.
   - Services call Repositories. Services NEVER run direct Mongoose queries.

4. **Repositories Contain ALL Data Access:**
   - All database reads/writes (`find`, `create`, `updateOne`, `aggregate`) live exclusively in `*.repository.ts`.
   - Repositories implement graceful memory fallback if MongoDB is temporarily unavailable.

5. **Security & Edge Cases:**
   - Auth tokens strictly in **HttpOnly, Secure Cookies** (Zero `localStorage` tokens).
   - Sanitize all external URLs.
   - Defensive typing: No `any` unless strictly justified.
   - Mobile-first responsiveness across all screen sizes.

6. **Zero Cliché AI Sparkles (Strict Anti-Sparkle Law):**
   - No `Sparkles` or cheesy glitter icons. Use clean brand color dots or structural technical icons.

Refer to `ARCHITECTURE_RULES.md` and `AGENTS.md` for full implementation details.

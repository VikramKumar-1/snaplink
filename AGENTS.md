# 🚨 CRITICAL SYSTEM INSTRUCTIONS FOR ALL AI AGENTS & DEVELOPERS

> **MANDATORY READING BEFORE WRITING OR EDITING ANY CODE IN THIS REPOSITORY.**
> You must act as a **Principal Staff Full-Stack Engineer (15+ years experience)**.
> Every line of code written must be production-grade, enterprise-ready, defensive against edge cases, and strictly adhere to the project's architectural law.

---

## 🏛️ The Non-Negotiable 5-Layer Backend Architecture

Every feature in `backend/modules/<domain>/` MUST follow this exact flow. No exceptions:

```
[HTTP Request from Client / App]
              │
              ▼
1. app/api/<domain>/.../route.ts
   └─► ROUTER GLUE ONLY (2-3 lines max).
   └─► FORBIDDEN: DB queries, business logic, bcrypt, jwt, try/catch.
              │
              ▼
2. backend/modules/<domain>/<domain>.controller.ts
   └─► SKINNY CONTROLLER.
   └─► MUST wrap every method with `apiHandler(...)`.
   └─► Extracts req headers/body, calls Service, manages cookies/headers, returns JSON.
              │
              ▼
3. backend/modules/<domain>/<domain>.service.ts
   └─► BUSINESS LOGIC & ORCHESTRATION.
   └─► Zod validation parsing (`Schema.parse(rawBody)`).
   └─► Rate limiting checks, hashing, token issuance, domain business rules.
   └─► Calls Repository for data persistence. Never writes raw Mongoose queries.
              │
              ▼
4. backend/modules/<domain>/<domain>.repository.ts
   └─► DATA ACCESS LAYER.
   └─► Encapsulates all Mongoose queries (`find`, `create`, `updateOne`, `aggregate`).
   └─► Contains memory fallback/circuit-breaker logic if MongoDB is temporarily unreachable.
              │
              ▼
5. backend/modules/<domain>/<domain>.model.ts
   └─► SCHEMA & TYPE DEFINITIONS.
   └─► Typed TypeScript interfaces & Mongoose Schemas.
```

---

## 🛡️ Senior Staff Engineering Standards (Edge Case & Resilience Rules)

### 1. Defensive Input Validation
- **Never trust client input.** Every request body, query parameter, and URL slug MUST be validated with Zod in the `Service` layer.
- Sanitize URLs: ensure protocols (`https://`), block `javascript:`, `data:`, or malformed URLs.

### 2. Zero-Leak Token Security
- Sensitive tokens (`accessToken`, `refreshToken`) MUST NEVER be stored in `localStorage` or returned in JSON bodies for client-side storage.
- Always use **HttpOnly, Secure, SameSite=Strict Cookies**.
- Implement token rotation and revocation in the database.

### 3. Graceful Degradation & High Availability
- If MongoDB is disconnected or lagging, repositories must provide safe in-memory fallbacks or explicit error handling without crashing the Next.js server.
- Prevent unhandled promise rejections. All routes are safeguarded by `apiHandler`.

### 4. Bot & Abuse Protection
- Every public-facing generation or mutation endpoint MUST pass through `rateLimiter.ts` based on IP or authenticated user ID.
- Prevent slug collision races by ensuring atomic database indexing and fallback retries.

### 5. Mobile-First & Cross-Device UI
- All UI components must be fully responsive (iPhone SE 375px up to 4K displays).
- Never use fixed pixel widths that break mobile viewports.
- No blurry font rendering (`font-black` on small text is forbidden; use `font-bold` with proper tracking).

---

## ⚛️ Frontend Atomic Module Rules

1. **Max 50 Lines per File:** Split large components into atomic pieces.
2. **`parts/` Folder:** Extract UI sub-cards, modals, list items into `parts/`.
3. **`use<Feature>.ts` Hooks:** Extract all state, effects, and API calls into custom hooks.
4. **Layout Orchestrator:** The main `.tsx` file should only assemble parts and hooks.

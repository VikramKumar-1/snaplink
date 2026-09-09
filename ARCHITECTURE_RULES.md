# 🏛️ Enterprise Architecture Rules & Guidelines

> **CRITICAL INSTRUCTION FOR ALL AI AGENTS AND DEVELOPERS:**
> This codebase follows a **Strict Enterprise 5-Layer Backend Architecture** and **Atomic Frontend Architecture**. 
> DO NOT violate these rules under any circumstances.

---

## 📐 The 5-Layer Backend Architecture

Every single feature (Links, Auth, Analytics, QR, Campaigns) MUST adhere to this exact 5-layer flow:

```
[Client / Browser]
       │
       ▼
1. app/api/<domain>/route.ts       ◄─── [ROUTER GLUE ONLY] (2-3 lines max, ZERO logic)
       │
       ▼
2. backend/modules/<domain>/<domain>.controller.ts   ◄─── [SKINNY CONTROLLER] (Wrapped in apiHandler, HTTP in/out)
       │
       ▼
3. backend/modules/<domain>/<domain>.service.ts      ◄─── [BUSINESS LOGIC] (Zod parse, crypto, orchestration)
       │
       ▼
4. backend/modules/<domain>/<domain>.repository.ts   ◄─── [DATA ACCESS LAYER] (Mongoose queries, DB operations)
       │
       ▼
5. backend/modules/<domain>/<domain>.model.ts        ◄─── [SCHEMA & INTERFACES] (Mongoose models, types)
```

---

## 🚫 The 5 Golden Backend Rules

### Rule 1: `app/` is STRICTLY Router Glue (2-3 Lines Max)
- **FORBIDDEN:** Direct database calls (`User.findOne`, `Link.create`, etc.).
- **FORBIDDEN:** Direct business logic, token generation, or cryptography (`bcrypt`, `jwt`, `new OAuth2Client`).
- **FORBIDDEN:** `try/catch` blocks inside `app/api/.../route.ts`.
- **CORRECT EXAMPLE:**
```typescript
// app/api/auth/login/route.ts
import { NextRequest } from "next/server";
import { AuthController } from "@/backend/modules/auth/auth.controller";

export async function POST(req: NextRequest) {
  return AuthController.handleLogin(req);
}
```

### Rule 2: Controllers MUST be Skinny (Laravel Style)
- Controllers ONLY extract request payload/headers, call the Service, set cookies/headers, and return JSON.
- Never write manual `try/catch` in controllers. Always wrap methods in `apiHandler(...)`.
- **CORRECT EXAMPLE:**
```typescript
// backend/modules/auth/auth.controller.ts
export class AuthController {
  static handleLogin = apiHandler(async (req: NextRequest) => {
    const body = await req.json();
    const { user, accessToken, refreshToken } = await AuthService.login(body);
    await setTokenCookies(accessToken, refreshToken);
    return NextResponse.json({ success: true, user });
  });
}
```

### Rule 3: Services Contain ALL Business Logic & Validation
- Zod schema parsing happens in the Service (`RegisterSchema.parse(rawBody)`).
- Hashing, token generation, platform detection, rate limit verification belong in the Service.
- Services call Repositories to read/write data. Services DO NOT execute raw Mongoose queries directly.

### Rule 4: Repositories Contain ALL Database Queries
- Mongoose operations (`find`, `create`, `updateOne`, `aggregate`) live ONLY in `*.repository.ts`.
- All DB errors or memory fallback caches are encapsulated inside the repository.

### Rule 5: Single Source of Truth for Config & Shared Utilities
- Rate limits live in `backend/config/rateLimit.config.ts`.
- Error handling lives in `backend/shared/utils/apiHandler.ts`.
- Database connection lives in `backend/config/db.ts` (`connectToDatabase`).

---

## ⚛️ Frontend Architecture Rules

1. **Pragmatic Atomic Components (Target 100–200 Lines, Max 250 Lines):**
   - Avoid artificial micro-splitting (<50 lines) that causes file sprawl and tracing friction.
   - Strictly avoid 300+ line monolithic components that slow down rendering and hurt maintainability.
   - Extract state and logic into custom hooks (`use<Feature>.ts`).
   - Extract visual sub-components and modals into `parts/`.
   - The main `<Feature>.tsx` acts as a clean layout orchestrator.

2. **State Management:**
   - Global client state lives in `frontend/shared/store/` (Zustand).
   - No sensitive tokens in `localStorage`. Auth relies strictly on **HttpOnly Cookies**.

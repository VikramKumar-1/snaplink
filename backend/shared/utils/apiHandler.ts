import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Global API Exception & Zod Handler
 * Catches ALL exceptions, formats Zod validation errors, and returns clean JSON responses.
 * Strictly types the first parameter as NextRequest to satisfy Next.js 15 route constraints.
 */
export function apiHandler<T extends any[]>(
  handler: (req: NextRequest, ...args: T) => Promise<NextResponse>
): (req: NextRequest, ...args: T) => Promise<NextResponse> {
  return async (req: NextRequest, ...args: T) => {
    try {
      return await handler(req, ...args);
    } catch (err: any) {
      // 1. Zod Validation Errors
      if (err instanceof ZodError) {
        const firstIssue = err.issues[0];
        const fieldName = firstIssue.path.join(".");
        const message = fieldName
          ? `${fieldName}: ${firstIssue.message}`
          : firstIssue.message;

        return NextResponse.json(
          {
            error: message,
            issues: err.issues,
          },
          { status: 400 }
        );
      }

      // 2. Custom App Exceptions
      console.error("API Error:", err.message);
      const status = err.statusCode || err.status || 500;
      return NextResponse.json(
        { error: err.message || "Internal Server Error" },
        { status }
      );
    }
  };
}

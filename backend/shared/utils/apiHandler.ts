import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

type RouteHandler = (req: NextRequest) => Promise<NextResponse>;

/**
 * Global API Exception & Zod Handler
 * Catches ALL exceptions, formats Zod validation errors, and returns clean JSON responses.
 */
export function apiHandler(handler: RouteHandler): RouteHandler {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
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

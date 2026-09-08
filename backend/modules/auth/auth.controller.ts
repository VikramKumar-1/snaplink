import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthService } from "./auth.service";
import { apiHandler } from "@/backend/shared/utils/apiHandler";
import { verifyAccessToken } from "@/backend/shared/utils/jwt.util";

async function setTokenCookies(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === "production";

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    path: "/",
    maxAge: 15 * 60, // 15 minutes
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  });
}

async function clearTokenCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

export class AuthController {
  static handleRegister = apiHandler(async (req: NextRequest) => {
    const body = await req.json();
    const { user, accessToken, refreshToken } = await AuthService.register(body);
    await setTokenCookies(accessToken, refreshToken);
    return NextResponse.json({ success: true, user }, { status: 201 });
  });

  static handleLogin = apiHandler(async (req: NextRequest) => {
    const body = await req.json();
    const { user, accessToken, refreshToken } = await AuthService.login(body);
    await setTokenCookies(accessToken, refreshToken);
    return NextResponse.json({ success: true, user });
  });

  static handleGoogleAuth = apiHandler(async (req: NextRequest) => {
    const body = await req.json();
    const { user, accessToken, refreshToken } = await AuthService.googleAuth(body);
    await setTokenCookies(accessToken, refreshToken);
    return NextResponse.json({ success: true, user });
  });

  static handleRefreshToken = apiHandler(async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const { accessToken } = await AuthService.refreshAccessToken(refreshToken);

    const isProd = process.env.NODE_ENV === "production";
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    });

    return NextResponse.json({ success: true });
  });

  static handleLogout = apiHandler(async () => {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;
    await AuthService.logout(refreshToken);
    await clearTokenCookies();
    return NextResponse.json({ success: true, message: "Logged out successfully." });
  });

  static handleGetMe = apiHandler(async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const user = await AuthService.getCurrentUser(accessToken);
    return NextResponse.json({ success: true, user });
  });

  static handleSyncLinks = apiHandler(async (req: NextRequest) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyAccessToken(token);
    if (!decoded || !decoded.userId) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const { modifiedCount } = await AuthService.syncAnonymousLinks(decoded.userId, body);
    return NextResponse.json({
      success: true,
      message: `Synced ${modifiedCount} links to your account.`,
    });
  });
}

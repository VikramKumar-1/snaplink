import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const publicDir = path.join(process.cwd(), "public");
  const ytPath = path.join(publicDir, "youtube-logo.png");
  
  if (!fs.existsSync(ytPath)) {
    return NextResponse.json({ error: "File not found" });
  }

  // Check header / byte info
  const buf = fs.readFileSync(ytPath);
  
  // Return info
  return NextResponse.json({
    size: buf.length,
    firstBytes: buf.slice(0, 16).toString("hex"),
  });
}

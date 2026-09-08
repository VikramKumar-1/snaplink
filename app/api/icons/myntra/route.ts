import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const publicTarget = path.join(process.cwd(), "public", "myntra-logo.png");

  if (fs.existsSync(publicTarget)) {
    const fileBuffer = fs.readFileSync(publicTarget);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return NextResponse.json({ error: "Myntra logo not found" }, { status: 404 });
}

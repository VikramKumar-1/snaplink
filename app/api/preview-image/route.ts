import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const publicTarget = path.join(process.cwd(), "public", "sony-deal.jpg");

  if (fs.existsSync(publicTarget)) {
    const fileBuffer = fs.readFileSync(publicTarget);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return NextResponse.json({ error: "Image not found" }, { status: 404 });
}

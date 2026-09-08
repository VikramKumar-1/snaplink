import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const source =
    "C:\\Users\\vikur\\.gemini\\antigravity\\brain\\4d14204e-3b4a-457c-8daa-825c80124745\\sony_earbuds_deal_1788777695357.jpg";

  // Automatically ensure public directory exists and copy image there
  try {
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const targetFile = path.join(publicDir, "sony-deal.jpg");
    if (fs.existsSync(source) && !fs.existsSync(targetFile)) {
      fs.copyFileSync(source, targetFile);
    }
  } catch (err) {
    console.error("Asset sync error:", err);
  }

  if (fs.existsSync(source)) {
    const fileBuffer = fs.readFileSync(source);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  return NextResponse.json({ error: "Image not found" }, { status: 404 });
}

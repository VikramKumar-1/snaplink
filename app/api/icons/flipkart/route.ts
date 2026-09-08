import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const source =
    "C:\\Users\\vikur\\.gemini\\antigravity\\brain\\a113f34c-50eb-4dee-8bb6-11b733e4e70f\\.user_uploaded\\media_1788862849921.png";

  try {
    const publicDir = path.join(process.cwd(), "public");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const targetFile = path.join(publicDir, "flipkart-logo.png");
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, targetFile);
    }
  } catch (err) {
    console.error("Failed to copy Flipkart logo asset:", err);
  }

  const publicTarget = path.join(process.cwd(), "public", "flipkart-logo.png");
  const fileToServe = fs.existsSync(publicTarget) ? publicTarget : source;

  if (fs.existsSync(fileToServe)) {
    const fileBuffer = fs.readFileSync(fileToServe);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return NextResponse.json({ error: "Flipkart logo not found" }, { status: 404 });
}

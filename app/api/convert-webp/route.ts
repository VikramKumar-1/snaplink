import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const publicDir = path.join(process.cwd(), "public");
  const results: any = {};

  const filesToConvert = [
    {
      name: "youtube-logo",
      source: "C:/Users/vikur/.gemini/antigravity/brain/a113f34c-50eb-4dee-8bb6-11b733e4e70f/.user_uploaded/media_1788864490213.png",
      pngPath: path.join(publicDir, "youtube-logo.png"),
      webpPath: path.join(publicDir, "youtube-logo.webp"),
      width: 640,
      quality: 100,
    },
  ];

  for (const item of filesToConvert) {
    try {
      if (item.source && fs.existsSync(item.source)) {
        fs.copyFileSync(item.source, item.pngPath);
      }

      if (fs.existsSync(item.pngPath)) {
        const optimizerUrl = `http://localhost:3000/_next/image?url=%2F${path.basename(item.pngPath)}&w=${item.width || 384}&q=${item.quality || 95}`;
        const res = await fetch(optimizerUrl, {
          headers: {
            "Accept": "image/webp,image/*,*/*;q=0.8",
          },
        });

        if (res.ok) {
          const contentType = res.headers.get("content-type");
          const buffer = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(item.webpPath, buffer);
          results[item.name] = {
            status: "success",
            contentType,
            size: buffer.length,
            path: item.webpPath,
          };
        } else {
          results[item.name] = {
            status: "optimizer_failed",
            httpStatus: res.status,
          };
        }
      }
    } catch (e: any) {
      results[item.name] = {
        status: "error",
        message: e.message,
      };
    }
  }

  return NextResponse.json({ results });
}

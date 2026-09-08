import fs from "fs";
import path from "path";
import zlib from "zlib";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function makeCrcTable() {
  const table: number[] = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  return table;
}
const crcTable = makeCrcTable();
function crc32(buf: Buffer): number {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type: string, data: Buffer): Buffer {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, "ascii");
  data.copy(chunk, 8);
  const typeAndData = chunk.slice(4, 8 + len);
  const crc = crc32(typeAndData);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

export async function GET() {
  const publicDir = path.join(process.cwd(), "public");
  const source = "C:/Users/vikur/.gemini/antigravity/brain/a113f34c-50eb-4dee-8bb6-11b733e4e70f/.user_uploaded/media_1788864588094.png";

  if (!fs.existsSync(source)) {
    return NextResponse.json({ error: "Source not found" });
  }

  const buf = fs.readFileSync(source);
  let pos = 8;
  let width = 0;
  let height = 0;
  const idatChunks: Buffer[] = [];

  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.slice(pos + 8, pos + 8 + len);
    pos += 12 + len;

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
    } else if (type === "IDAT") {
      idatChunks.push(data);
    } else if (type === "IEND") {
      break;
    }
  }

  const inflated = zlib.inflateSync(Buffer.concat(idatChunks));
  const bpp = 4;
  const stride = 1 + width * bpp;

  const raw = Buffer.alloc(width * height * bpp);
  for (let y = 0; y < height; y++) {
    const filter = inflated[y * stride];
    const srcRow = y * stride + 1;
    const dstRow = y * width * bpp;

    for (let x = 0; x < width * bpp; x++) {
      const xVal = inflated[srcRow + x];
      const a = x >= bpp ? raw[dstRow + x - bpp] : 0;
      const b = y > 0 ? raw[(y - 1) * width * bpp + x] : 0;
      const c = y > 0 && x >= bpp ? raw[(y - 1) * width * bpp + x - bpp] : 0;

      let val = xVal;
      if (filter === 0) val = xVal;
      else if (filter === 1) val = (xVal + a) & 0xff;
      else if (filter === 2) val = (xVal + b) & 0xff;
      else if (filter === 3) val = (xVal + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        const pr = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
        val = (xVal + pr) & 0xff;
      }
      raw[dstRow + x] = val;
    }
  }

  // Find bounding box of red circle (r > 150, g < 70, b < 70)
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = raw[idx];
      const g = raw[idx + 1];
      const b = raw[idx + 2];
      if (r > 150 && g < 70 && b < 70) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const spanW = maxX - minX + 1;
  const spanH = maxY - minY + 1;
  const size = Math.max(spanW, spanH);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const radius = size / 2;

  const cropMinX = Math.round(cx - radius);
  const cropMinY = Math.round(cy - radius);
  const cropSize = size;

  const cropRaw = Buffer.alloc(cropSize * (1 + cropSize * 4));

  for (let y = 0; y < cropSize; y++) {
    const origY = cropMinY + y;
    const dstLine = y * (1 + cropSize * 4);
    cropRaw[dstLine] = 0;

    for (let x = 0; x < cropSize; x++) {
      const origX = cropMinX + x;
      const dstIdx = dstLine + 1 + x * 4;

      const distFromCenter = Math.sqrt(Math.pow(x - radius, 2) + Math.pow(y - radius, 2));

      if (distFromCenter > radius - 0.5) {
        cropRaw[dstIdx] = 0;
        cropRaw[dstIdx + 1] = 0;
        cropRaw[dstIdx + 2] = 0;
        cropRaw[dstIdx + 3] = 0;
      } else {
        if (origX >= 0 && origX < width && origY >= 0 && origY < height) {
          const srcIdx = (origY * width + origX) * 4;
          cropRaw[dstIdx] = raw[srcIdx];
          cropRaw[dstIdx + 1] = raw[srcIdx + 1];
          cropRaw[dstIdx + 2] = raw[srcIdx + 2];
          cropRaw[dstIdx + 3] = 255;
        } else {
          cropRaw[dstIdx] = 0;
          cropRaw[dstIdx + 1] = 0;
          cropRaw[dstIdx + 2] = 0;
          cropRaw[dstIdx + 3] = 0;
        }
      }
    }
  }

  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(cropSize, 0);
  ihdrData.writeUInt32BE(cropSize, 4);
  ihdrData.writeUInt8(8, 8);
  ihdrData.writeUInt8(6, 9);
  ihdrData.writeUInt8(0, 10);
  ihdrData.writeUInt8(0, 11);
  ihdrData.writeUInt8(0, 12);
  const ihdrChunk = createChunk("IHDR", ihdrData);

  const deflated = zlib.deflateSync(cropRaw);
  const idatChunk = createChunk("IDAT", deflated);
  const iendChunk = createChunk("IEND", Buffer.alloc(0));

  const pngOut = Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
  const targetPng = path.join(publicDir, "youtube-circle.png");
  fs.writeFileSync(targetPng, pngOut);

  // Convert newly created youtube-circle.png to WebP via Next.js optimizer
  const optUrl = `http://localhost:3000/_next/image?url=%2Fyoutube-circle.png&w=640&q=100`;
  const res = await fetch(optUrl, {
    headers: { "Accept": "image/webp,image/*,*/*;q=0.8" },
  });

  if (res.ok) {
    const webpBuf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(path.join(publicDir, "youtube-logo.webp"), webpBuf);
    return NextResponse.json({
      status: "success",
      cropSize,
      webpSize: webpBuf.length,
    });
  }

  return NextResponse.json({ status: "webp_failed", cropSize });
}

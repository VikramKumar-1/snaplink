import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

export function downloadQrPNG(svgElement: SVGElement | null | undefined): void {
  if (!svgElement) return;
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  canvas.width = 1200;
  canvas.height = 1200;

  img.onload = () => {
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1200, 1200);
    ctx.drawImage(img, 100, 100, 1000, 1000);
    const link = document.createElement("a");
    link.download = `${BRAND_CONFIG.name.toLowerCase()}-qr-code.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  img.src =
    "data:image/svg+xml;base64," +
    btoa(unescape(encodeURIComponent(svgData)));
}

export function downloadQrSVG(svgElement: SVGElement | null | undefined): void {
  if (!svgElement) return;
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const blob = new Blob([svgData], {
    type: "image/svg+xml;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${BRAND_CONFIG.name.toLowerCase()}-qr-vector.svg`;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

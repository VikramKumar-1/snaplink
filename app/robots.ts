import { MetadataRoute } from "next";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = BRAND_CONFIG.baseUrl;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

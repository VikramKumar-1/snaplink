"use client";

import React from "react";

interface IconProps {
  className?: string;
}

// 1. Official YouTube Circular Badge Logo (Optimized WebP Asset)
export const YoutubeLogo: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
  <img
    src="/youtube-logo.webp"
    alt="YouTube"
    className={`${className} object-contain inline-block`}
    loading="eager"
    decoding="async"
  />
);

// 2. Official Instagram Logo (Optimized WebP Asset)
export const InstagramLogo: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
  <img
    src="/instagram-logo.webp"
    alt="Instagram"
    className={`${className} object-contain inline-block`}
    loading="eager"
    decoding="async"
  />
);

// 3. Crisp Telegram Vector Logo
export const TelegramLogo: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12.056 0h-.112zM17.9 7.2l-2.1 9.9c-.15.7-.55.85-1.1.55l-3.05-2.25-1.45 1.4c-.15.15-.3.3-.65.3l.2-3.05 5.5-4.95c.25-.2-.05-.35-.35-.15l-6.8 4.3-2.95-.9c-.65-.2-.65-.65.15-.95l11.5-4.45c.5-.15.95.15.75.95h.35z" />
  </svg>
);

// 4. Official Amazon Logo (Optimized WebP Asset)
export const AmazonLogo: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
  <img
    src="/amazon-logo.webp"
    alt="Amazon"
    className={`${className} object-contain inline-block`}
    loading="eager"
    decoding="async"
  />
);

// 5. Crisp Spotify Vector Logo
export const SpotifyLogo: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

// 6. Crisp WhatsApp Vector Logo
export const WhatsAppLogo: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

// 7. Iconic Myntra Multi-Color Logo (Optimized WebP Asset)
export const MyntraLogo: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
  <img
    src="/myntra-logo.webp"
    alt="Myntra"
    className={`${className} object-contain inline-block`}
    loading="eager"
    decoding="async"
  />
);

// 8. Crisp Flipkart Official Logo (Optimized WebP Asset)
export const FlipkartLogo: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
  <img
    src="/flipkart-logo.webp"
    alt="Flipkart"
    className={`${className} object-contain inline-block`}
    loading="eager"
    decoding="async"
  />
);

// 9. Crisp Shopify Official Logo (Optimized WebP Asset)
export const ShopifyLogo: React.FC<IconProps> = ({ className = "h-6 w-6" }) => (
  <img
    src="/shopify-logo.webp"
    alt="Shopify"
    className={`${className} object-contain inline-block`}
    loading="lazy"
  />
);

// 10. Official Apple Vector Logo (FontAwesome apple)
export const AppleBrandIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 384 512" fill="currentColor" className={`${className} inline-block`}>
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

// 11. Official Android Vector Logo (FontAwesome android)
export const AndroidBrandIcon: React.FC<IconProps> = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 576 512" fill="currentColor" className={`${className} inline-block`}>
    <path d="M420.55 301.93a24 24 0 1 1 24-24 24 24 0 0 1-24 24m-265.1 0a24 24 0 1 1 24-24 24 24 0 0 1-24 24m273.7-144.48 47.9-83a10 10 0 1 0-17.27-10l-48.54 84.07a206.56 206.56 0 0 0-246.48 0L116.22 64.45a10 10 0 0 0-17.27 10l47.9 83C64.65 202.22 8.24 285.55 0 384h576c-8.24-98.45-64.65-181.78-146.85-226.55" />
  </svg>
);


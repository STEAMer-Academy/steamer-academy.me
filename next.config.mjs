/** @type {import('next').NextConfig} */
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
import { withPWA } from "next-pwa";

const nextConfigFunction = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const PWAconfig = {
    dest: "public/next-pwa",
    disable: process.env.NODE_ENV === "development",
  };

  const nextConfig = {
    reactStrictMode: true,
    assetPrefix: isDev ? undefined : "https://cdn.steameracademy.me",
    basePath: "/",

    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "raw.githubusercontent.com",
        },
      ],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [
        16, 32, 64, 96, 128, 256, 384, 512, 640, 768, 1024, 1280, 1536,
      ],
      formats: ["image/webp", "image/avif"],
      minimumCacheTTL: 3600,
    },

    async headers() {
      return [
        {
          source: "/(.*)",
          headers: [
            {
              key: "x-robots-tag",
              value: "all",
            },
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable",
            },
          ],
        },
        {
          source: "/api/(.*)",
          headers: [
            {
              key: "Cache-Control",
              value: "no-store, max-age=0",
            },
          ],
        },
      ];
    },
  };

  return withPWA(PWAconfig)(nextConfig);
};

export default nextConfigFunction;

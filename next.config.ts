import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
import bundleAnalyzer from "@next/bundle-analyzer";
import withPWAInit from "@ducanh2912/next-pwa";
import { withBetterStack } from "@logtail/next";
import type { NextConfig } from "next";
import type { PluginOptions } from "@ducanh2912/next-pwa";
import fs from "fs";
import path from "path";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
} satisfies PluginOptions);

const nextConfigFunction = (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  });

  const version = fs.readFileSync(path.resolve("./version.txt"), "utf8").trim();

  const nextConfig: NextConfig = {
    experimental: {
      optimizeCss: true,
    },
    env: {
      NEXT_PUBLIC_APP_VERSION: version,
    },
    reactStrictMode: true,
    assetPrefix: isDev ? undefined : "https://cdn.steameracademy.me",

    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "raw.githubusercontent.com",
        },
        {
          protocol: "https",
          hostname: "**.vercel.app",
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

    async redirects() {
      return [
        {
          source: "/discord",
          destination: "https://discord.gg/HNhjQAfq9U",
          permanent: true,
        },
      ];
    },
  };

  return withBundleAnalyzer(withBetterStack(withPWA(nextConfig)));
};

export default nextConfigFunction;

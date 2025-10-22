import bundleAnalyzer from "@next/bundle-analyzer";
import withPWAInit from "@ducanh2912/next-pwa";
import type { PluginOptions } from "@ducanh2912/next-pwa";
import fs from "fs";
import path from "path";
import type { NextConfig } from "next";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
} satisfies PluginOptions);

const nextConfigFunction = () => {
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
    reactCompiler: true,

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
      formats: ["image/webp", "image/avif"],
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

  return withBundleAnalyzer(withPWA(nextConfig));
};

export default nextConfigFunction;

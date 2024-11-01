/** @type {import('next').NextConfig} */
import withMDX from "@next/mdx";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

const mdxConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const nextConfigFunction = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const nextConfig = {
    reactStrictMode: true,
    assetPrefix: isDev ? undefined : "https://cdn.steameracademy.me",
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

    async redirects() {
      return [
        {
          source: "/:path*",
          has: [
            {
              type: "host",
              value: "steamer-academy.netlify.app",
            },
          ],
          destination: "https://www.steameracademy.me/:path*",
          permanent: true,
        },
      ];
    },

    async headers() {
      return [
        {
          source: "/(.*)", // This applies to all routes
          headers: [
            {
              key: "x-robots-tag",
              value: "all", // Allow all bots to index and follow links
            },
          ],
        },
      ];
    },
  };

  return withMDX(mdxConfig)(nextConfig);
};

export default nextConfigFunction;

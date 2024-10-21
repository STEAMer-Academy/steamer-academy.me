/** @type {import('next').NextConfig} */
import withMDX from "@next/mdx";
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const mdxConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
};

const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "steamer-academyme.netlify.app",
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

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default withMDX(mdxConfig)(nextConfig);

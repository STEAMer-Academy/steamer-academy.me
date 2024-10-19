/** @type {import('next').NextConfig} */
import withMDX from "@next/mdx"

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: true,
  },

  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

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

export default withMDX(nextConfig);

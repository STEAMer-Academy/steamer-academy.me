/** @type {import('next').NextConfig} */
import withMDX from "@next/mdx"

const mdxConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}

const nextConfig = {
  reactStrictMode: true,

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

export default withMDX(mdxConfig)(nextConfig);

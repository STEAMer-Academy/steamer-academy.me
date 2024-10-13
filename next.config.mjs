/** @type {import('next').NextConfig} */
import withPWA from "next-pwa";

const pwaConfig= {
    dest: 'public',  // Location of service worker and cache files
    disable: process.env.NODE_ENV === 'development',  // Disable PWA in development
    register: true,
    skipWaiting: true,
  }

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole: true,
  }, 

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

export default withPWA(pwaConfig)(nextConfig);

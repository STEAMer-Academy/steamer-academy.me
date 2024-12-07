import { withSentryConfig } from "@sentry/nextjs";
/** @type {import('next').NextConfig} */
// import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";
import bundleAnalyzer from "@next/bundle-analyzer";
import withPWAInit from "@ducanh2912/next-pwa";
import { withLogtail } from "@logtail/next";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

const nextConfigFunction = () => {
  // const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
  });

  const nextConfig = {
    experimental: {
      optimizeCss: true,
    },
    reactStrictMode: true,
    // assetPrefix: isDev ? undefined : "https://cdn.steameracademy.me",

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

  return withBundleAnalyzer(withLogtail(withPWAInit(withPWA)(nextConfig)));
};

export default withSentryConfig(nextConfigFunction, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "steamer-academy",
  project: "javascript-nextjs-steamer-tu",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});

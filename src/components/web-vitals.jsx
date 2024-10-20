"use client";

import { useReportWebVitals } from "next/web-vitals";
import Script from "next/script";

export default function WebVitals() {
  // Web Vitals reporting
  useReportWebVitals((metric) => {
    if (typeof window.gtag === "function") {
      const value = Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value);

      window.gtag("event", metric.name, {
        value, // Send rounded value for better precision
        event_label: metric.id, // Metric ID can help with tracing
        non_interaction: true, // Ensures this doesn’t affect bounce rate
      });
    } else {
      console.warn("Google Analytics gtag.js has not loaded.");
    }
  });

  return (
    <div>
      {/* Load Google Analytics script */}
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />

      {/* Initialize gtag when script is loaded */}
      <Script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </div>
  );
}

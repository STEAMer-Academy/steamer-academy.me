"use client";

import React from "react";
import Script from "next/script";

const Analytics = ({
  consentGiven,
}: {
  consentGiven: boolean;
}): React.ReactElement | null => {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  if (!consentGiven) return null;
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        type="text/partytown"
      />
      <Script id="google-analytics" type="text/partytown">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `}
      </Script>
      <script>
        {`
        {(function(h, o, u, n, d) {
          h = h[d] = h[d] || { q: [], onReady: function(c) { h.q.push(c) } }
          d = o.createElement(u); d.async = 1; d.src = n
          n = o.getElementsByTagName(u)[0]; n.parentNode.insertBefore(d, n)
        })(window, document, 'script', 'https://www.datadoghq-browser-agent.com/us5/v5/datadog-rum.js', 'DD_RUM')
        window.DD_RUM.onReady(function() {
          window.DD_RUM.init({
            clientToken: 'pub830b2ea57c98e3b93c603f1260a10ec9',
            applicationId: 'bc498e74-83f8-4274-9b1d-47ee75bca0f2',
            // see https://docs.datadoghq.com/getting_started/site/
            site: 'us5.datadoghq.com',
            service: 'steamer-next.js',
            env: 'production',
            // Specify a version number to identify the deployed version of your application in Datadog
            // version: '1.0.0',
            sessionSampleRate: 100,
            sessionReplaySampleRate: 20,
            trackUserInteractions: true,
            trackResources: true,
            trackLongTasks: true,
            defaultPrivacyLevel: 'mask-user-input',
          })
  })
        `}
      </script>
    </>
  );
};

export default Analytics;

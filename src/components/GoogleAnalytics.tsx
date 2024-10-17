"use client";

import React from "react";
import Script from "next/script";
import "dotenv/config";

const GoogleAnalytics = (): React.ReactElement => {

  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        type="text/partytown"
      />
      <Script id="google-analytics" type="text/partytown">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
      `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;

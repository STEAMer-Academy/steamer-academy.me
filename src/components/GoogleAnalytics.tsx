"use client";

import React,{ useEffect } from "react";
import Script from "next/script";

const GoogleAnalytics = (): React.ReactElement => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/~partytown/partytown-sw.js')
        .then(registration => {
          console.log('Partytown Service Worker registered with scope:', registration.scope);
        })
        .catch(err => {
          console.error('Service Worker registration failed:', err);
        });
    }
  }, []);

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-DD3FHBDSP0`}
        type="text/partytown"
      />
      <Script id="google-analytics" type="text/partytown">
      {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DD3FHBDSP0');
      `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;


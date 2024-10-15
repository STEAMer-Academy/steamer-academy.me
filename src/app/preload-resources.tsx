"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preconnect("https://www.google-analytics.com");
  ReactDOM.preconnect("https://www.googletagmanager.com");

  return null;
}

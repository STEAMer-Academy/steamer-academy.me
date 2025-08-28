"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preconnect("https://www.google-analytics.com");
  ReactDOM.preconnect("https://www.googletagmanager.com");
  ReactDOM.preload("https://steamer-academy.vercel.app/blogs");
  ReactDOM.preconnect("https://raw.githubusercontent.com");
  return null;
}

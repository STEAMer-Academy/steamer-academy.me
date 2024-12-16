"use client";

import { datadogRum } from "@datadog/browser-rum";
import { useEffect } from "react";

export default function Datadog() {
  useEffect(() => {
    datadogRum.init({
      applicationId: "bc498e74-83f8-4274-9b1d-47ee75bca0f2",
      clientToken: "pub830b2ea57c98e3b93c603f1260a10ec9",
      site: "us5.datadoghq.com",
      service: "steamer-next.js",
      env: "production",
      version: process.env.NEXT_PUBLIC_APP_VERSION || "0.0.0",
      sessionSampleRate: 100,
      sessionReplaySampleRate: 100,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: "mask-user-input",
      allowedTracingUrls: [
        "https://api.steameracademy.me",
        /https:\/\/.*\.steameracademy\.me/,
        (url) => url.startsWith("https://api.steameracademy.me"),
      ],
    });

    datadogRum.startSessionReplayRecording();
    datadogRum.startDurationVital("dropdownRendering");
    datadogRum.stopDurationVital("dropdownRendering");
  }, []);

  return null;
}

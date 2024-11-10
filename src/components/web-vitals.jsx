"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitals() {
  return (
    <div>
      {useReportWebVitals((metric) => {
        console.log(metric);
      })}
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";

/* === Services Page Components === */
export const ServicesList = dynamic(() =>
  import("@/components/pages/Services/ServicesList").then((mod) => mod.default),
);

export const ReviewsList = dynamic(() =>
  import("@/components/pages/Services/ReviewsList").then((mod) => mod.default),
);

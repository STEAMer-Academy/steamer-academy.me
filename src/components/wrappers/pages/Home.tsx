"use client";

import dynamic from "next/dynamic";

/* === Globe === */
export const Globe = dynamic(
  () => import("@/components/pages/Home/Globe").then((mod) => mod.default),
  { ssr: false },
);

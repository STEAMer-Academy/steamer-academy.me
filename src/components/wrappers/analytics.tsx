import dynamic from "next/dynamic";

export const CookieConsent = dynamic(
  () => import("@/components/analytics/CookieConsent"),
);

export const Analytics = dynamic(() => import("@/components/analytics"));

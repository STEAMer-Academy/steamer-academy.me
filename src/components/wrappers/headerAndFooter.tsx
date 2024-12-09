"use client";

import dynamic from "next/dynamic";

/* === Header And Footer In Layout === */
export const Layout = dynamic(() =>
  import("@/components/headerAndFooter/Layout").then((mod) => mod.default),
);

export const Header = dynamic(() =>
  import("@/components/headerAndFooter/Header").then((mod) => mod.default),
);

export const Footer = dynamic(() =>
  import("@/components/headerAndFooter/Footer").then((mod) => mod.default),
);

export const NewsletterForm = dynamic(() =>
  import("@/components/headerAndFooter/NewsletterForm").then(
    (mod) => mod.NewsletterForm,
  ),
);

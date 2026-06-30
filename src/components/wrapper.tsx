"use client";

import dynamic from "next/dynamic";

/* === TypewriterEffect === */
export const TypewriterEffectSmooth = dynamic(() =>
  import("@/components/ui/typewriter-effect").then(
    (mod) => mod.TypewriterEffectSmooth,
  ),
);

/* === Header And Footer In Layout === */
export const Layout = dynamic(() =>
  import("@/components/Layout").then((mod) => mod.default),
);

/* === Opinion Component === */
export const GalleryGrid = dynamic(() =>
  import("../app/gallery/GalleryGrid").then((mod) => mod.default),
);

/* === Button Component === */
export const Button = dynamic(() =>
  import("@/components/ui/button").then((mod) => mod.Button),
);

/* === Input Component === */
export const Input = dynamic(() =>
  import("@/components/ui/input").then((mod) => mod.Input),
);

/* === Pagination Component === */
export const Pagination = dynamic(() =>
  import("@/components/ui/pagination").then((mod) => mod.Pagination),
);

/* === Skeleton Component === */
export const Skeleton = dynamic(
  () => import("@/components/ui/skeleton").then((mod) => mod.Skeleton),
  { ssr: false },
);

/* === Card Component === */
export const Card = dynamic(() =>
  import("@/components/ui/card").then((mod) => mod.Card),
);

export const CardContent = dynamic(() =>
  import("@/components/ui/card").then((mod) => mod.CardContent),
);

export const CardHeader = dynamic(() =>
  import("@/components/ui/card").then((mod) => mod.CardHeader),
);

export const CardFooter = dynamic(() =>
  import("@/components/ui/card").then((mod) => mod.CardFooter),
);

export const CardTitle = dynamic(() =>
  import("@/components/ui/card").then((mod) => mod.CardTitle),
);

export const CardDescription = dynamic(() =>
  import("@/components/ui/card").then((mod) => mod.CardDescription),
);

/* === Services Page Components === */
export const ServicesList = dynamic(() =>
  import("../app/services/ServicesList").then((mod) => mod.default),
);

export const ReviewsList = dynamic(() =>
  import("../app/services/ReviewsList").then((mod) => mod.default),
);

/* === English Club Page Review Card === */
export const ReviewCardEnglish = dynamic(() =>
  import("../app/services/english-club/ReviewCard").then((mod) => mod.default),
);

/* === English Club Page Countdown Timer === */
export const CountdownTimer = dynamic(() =>
  import("../app/services/english-club/CountdownTimer").then(
    (mod) => mod.default,
  ),
);

/* === Code Club Page Review Card === */
export const ReviewCardCode = dynamic(() =>
  import("../app/services/code-club/ReviewCard").then((mod) => mod.default),
);

/* === Contact Page Components === */
export const ContactInfo = dynamic(() =>
  import("../app/contact/ContactInfo").then((mod) => mod.default),
);

export const ContactForm = dynamic(() =>
  import("../app/contact/ContactForm").then((mod) => mod.default),
);

/* === Blogs Page Components === */
export const BlogTabs = dynamic(() =>
  import("../app/blogs/BlogTabs").then((mod) => mod.default),
);

/* === About Page Components === */
export const AboutContent = dynamic(() =>
  import("../app/about/AboutContent").then((mod) => mod.default),
);

export const TeamMembers = dynamic(() =>
  import("../app/about/TeamMembers").then((mod) => mod.default),
);

"use client";

import dynamic from "next/dynamic";

/* === Globe === */
export const Globe = dynamic(
  () => import("@/components/Globe").then((mod) => mod.default),
  { ssr: false },
);

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

export const Header = dynamic(() =>
  import("@/components/Header").then((mod) => mod.default),
);

export const Footer = dynamic(() =>
  import("@/components/Footer").then((mod) => mod.default),
);

export const NewsletterForm = dynamic(() =>
  import("@/components/NewsletterForm").then((mod) => mod.NewsletterForm),
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

/* === Textarea Component === */
export const Textarea = dynamic(() =>
  import("@/components/ui/textarea").then((mod) => mod.Textarea),
);

/* === Sheet Component === */
export const Sheet = dynamic(() =>
  import("@/components/ui/sheet").then((mod) => mod.Sheet),
);

export const SheetContent = dynamic(() =>
  import("@/components/ui/sheet").then((mod) => mod.SheetContent),
);

export const SheetTrigger = dynamic(() =>
  import("@/components/ui/sheet").then((mod) => mod.SheetTrigger),
);

export const SheetClose = dynamic(() =>
  import("@/components/ui/sheet").then((mod) => mod.SheetClose),
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

/* === Dropdown Menu Component === */
export const DropdownMenu = dynamic(
  () => import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenu),
  {
    ssr: false,
  },
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

export const BlogList = dynamic(() =>
  import("../app/blogs/BlogList").then((mod) => mod.default),
);

/* === Blogs Page Components === */
export const AboutContent = dynamic(() =>
  import("../app/about/AboutContent").then((mod) => mod.default),
);

export const TeamMembers = dynamic(() =>
  import("../app/about/TeamMembers").then((mod) => mod.default),
);

/* === Shadcn Dialog Component === */
export const Dialog = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.Dialog),
);

export const DialogContent = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogContent),
);

export const DialogHeader = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogHeader),
);

export const DialogTitle = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogTitle),
);

export const DialogDescription = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogDescription),
);

export const DialogFooter = dynamic(() =>
  import("@/components/ui/dialog").then((mod) => mod.DialogFooter),
);

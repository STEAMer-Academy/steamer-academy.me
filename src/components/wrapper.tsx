"use client";

import dynamic from "next/dynamic";

export const TypewriterEffectSmooth = dynamic(() =>
  import("@/components/ui/typewriter-effect").then(
    (mod) => mod.TypewriterEffectSmooth,
  ),
);

export const Layout = dynamic(() =>
  import("@/components/Layout").then((mod) => mod.default),
);

export const Globe = dynamic(() =>
  import("@/components/Globe").then((mod) => mod.default),
);

export const GalleryGrid = dynamic(() =>
  import("../app/gallery/GalleryGrid").then((mod) => mod.default),
);

export const Button = dynamic(() =>
  import("@/components/ui/button").then((mod) => mod.Button),
);

export const Input = dynamic(() =>
  import("@/components/ui/input").then((mod) => mod.Input),
);

export const Header = dynamic(() =>
  import("@/components/Header").then((mod) => mod.default),
);

export const Footer = dynamic(() =>
  import("@/components/Footer").then((mod) => mod.default),
);

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

export const DropdownMenu = dynamic(() =>
  import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenu),
);

export const DropdownMenuContent = dynamic(() =>
  import("@/components/ui/dropdown-menu").then(
    (mod) => mod.DropdownMenuContent,
  ),
);

export const DropdownMenuTrigger = dynamic(() =>
  import("@/components/ui/dropdown-menu").then(
    (mod) => mod.DropdownMenuTrigger,
  ),
);

export const DropdownMenuItem = dynamic(() =>
  import("@/components/ui/dropdown-menu").then((mod) => mod.DropdownMenuItem),
);

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

export const ServicesList = dynamic(() =>
  import("../app/services/ServicesList").then((mod) => mod.default),
);

export const ReviewsList = dynamic(() =>
  import("../app/services/ReviewsList").then((mod) => mod.default),
);

export const ReviewCardEnglish = dynamic(() =>
  import("../app/services/english-club/ReviewCard").then((mod) => mod.default),
);

export const ReviewCardCode = dynamic(() =>
  import("../app/services/code-club/ReviewCard").then((mod) => mod.default),
);

export const CountdownTimer = dynamic(() =>
  import("../app/services/english-club/CountdownTimer").then(
    (mod) => mod.default,
  ),
);

export const ContactInfo = dynamic(() =>
  import("../app/contact/ContactInfo").then((mod) => mod.default),
);

export const ContactForm = dynamic(() =>
  import("../app/contact/ContactForm").then((mod) => mod.default),
);

export const BlogTabs = dynamic(() =>
  import("../app/blogs/BlogTabs").then((mod) => mod.default),
);

export const BlogList = dynamic(() =>
  import("../app/blogs/BlogList").then((mod) => mod.default),
);

export const AboutContent = dynamic(() =>
  import("../app/about/AboutContent").then((mod) => mod.default),
);

export const TeamMembers = dynamic(() =>
  import("../app/about/TeamMembers").then((mod) => mod.default),
);

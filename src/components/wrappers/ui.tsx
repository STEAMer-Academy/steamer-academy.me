"use client";

import dynamic from "next/dynamic";

/* === TypewriterEffect === */
export const TypewriterEffectSmooth = dynamic(() =>
  import("@/components/ui/typewriter-effect").then(
    (mod) => mod.TypewriterEffectSmooth,
  ),
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

export const PaginationContent = dynamic(() =>
  import("@/components/ui/pagination").then((mod) => mod.PaginationContent),
);

export const PaginationEllipsis = dynamic(() =>
  import("@/components/ui/pagination").then((mod) => mod.PaginationEllipsis),
);

export const PaginationItem = dynamic(() =>
  import("@/components/ui/pagination").then((mod) => mod.PaginationItem),
);

export const PaginationLink = dynamic(() =>
  import("@/components/ui/pagination").then((mod) => mod.PaginationLink),
);

export const PaginationNext = dynamic(() =>
  import("@/components/ui/pagination").then((mod) => mod.PaginationNext),
);

export const PaginationPrevious = dynamic(() =>
  import("@/components/ui/pagination").then((mod) => mod.PaginationPrevious),
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

/* === Sonner Component === */
export const Toaster = dynamic(
  () => import("@/components/ui/sonner").then((mod) => mod.Toaster),
  { ssr: false },
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

/* === Styled Button === */

export const StyledButton = dynamic(() =>
  import("@/components/ui/styled-button").then((mod) => mod.default),
);

export const Label = dynamic(() =>
  import("@/components/ui/label").then((mod) => mod.Label),
);

export const Checkbox = dynamic(() =>
  import("@/components/ui/checkbox").then((mod) => mod.Checkbox),
);

export const GoogleIcon = dynamic(() =>
  import("@/components/ui/icons").then((mod) => mod.GoogleIcon),
);

export const GitHubIcon = dynamic(() =>
  import("@/components/ui/icons").then((mod) => mod.GitHubIcon),
);

/* === Select Component === */

export const Select = dynamic(() =>
  import("@/components/ui/select").then((mod) => mod.Select),
);

export const SelectContent = dynamic(() =>
  import("@/components/ui/select").then((mod) => mod.SelectContent),
);

export const SelectItem = dynamic(() =>
  import("@/components/ui/select").then((mod) => mod.SelectItem),
);

export const SelectTrigger = dynamic(() =>
  import("@/components/ui/select").then((mod) => mod.SelectTrigger),
);

export const SelectValue = dynamic(() =>
  import("@/components/ui/select").then((mod) => mod.SelectValue),
);

/* === Tabs Component === */

export const Tabs = dynamic(() =>
  import("@/components/ui/tabs").then((mod) => mod.Tabs),
);

export const TabsList = dynamic(() =>
  import("@/components/ui/tabs").then((mod) => mod.TabsList),
);

export const TabsTrigger = dynamic(() =>
  import("@/components/ui/tabs").then((mod) => mod.TabsTrigger),
);

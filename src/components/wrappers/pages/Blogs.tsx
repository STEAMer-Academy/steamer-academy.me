import dynamic from "next/dynamic";

/* === Blogs Page Components === */
export const BlogTabs = dynamic(() =>
  import("@/components/pages/Blogs/BlogTabs").then((mod) => mod.default),
);

export const BlogList = dynamic(() =>
  import("@/components/pages/Blogs/BlogList").then((mod) => mod.default),
);

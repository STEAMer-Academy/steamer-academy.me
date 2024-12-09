import dynamic from "next/dynamic";

/* === Opinion Component === */
export const GalleryGrid = dynamic(() =>
  import("@/components/pages/Gallery/GalleryGrid").then((mod) => mod.default),
);

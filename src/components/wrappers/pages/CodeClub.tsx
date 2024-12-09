import dynamic from "next/dynamic";

/* === Code Club Page Review Card === */
export const ReviewCardCode = dynamic(() =>
  import("@/components/pages/CodeClub/ReviewCard").then((mod) => mod.default),
);

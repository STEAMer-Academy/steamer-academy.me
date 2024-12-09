import dynamic from "next/dynamic";

/* === English Club Page Review Card === */
export const ReviewCardEnglish = dynamic(() =>
  import("@/components/pages/EnglishClub/ReviewCard").then(
    (mod) => mod.default,
  ),
);

/* === English Club Page Countdown Timer === */
export const CountdownTimer = dynamic(() =>
  import("@/components/pages/EnglishClub/CountdownTimer").then(
    (mod) => mod.default,
  ),
);

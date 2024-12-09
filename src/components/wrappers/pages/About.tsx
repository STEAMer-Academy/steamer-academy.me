import dynamic from "next/dynamic";

export const AboutContent = dynamic(() =>
  import("@/components/pages/About/AboutContent").then((mod) => mod.default),
);

export const TeamMembers = dynamic(() =>
  import("@/components/pages/About/TeamMembers").then((mod) => mod.default),
);

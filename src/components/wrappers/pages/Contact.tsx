import dynamic from "next/dynamic";

/* === Contact Page Components === */
export const ContactInfo = dynamic(() =>
  import("@/components/pages/Contact/ContactInfo").then((mod) => mod.default),
);

export const ContactForm = dynamic(() =>
  import("@/components/pages/Contact/ContactForm").then((mod) => mod.default),
);

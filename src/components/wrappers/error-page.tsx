import dynamic from "next/dynamic";

const NotFoundContent = dynamic(
  () => import("@/components/error-page/NotFoundContent"),
);

export default NotFoundContent;

import { Metadata } from "next";
import dynamic from "next/dynamic";

const NotFoundContent = dynamic(() => import("../components/NotFoundContent").then((mod) => mod.default));
export const metadata: Metadata = {
  title: "STEAMer Academy | 404 Page Not Found",
  description: "The page you are looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return <NotFoundContent />;
}

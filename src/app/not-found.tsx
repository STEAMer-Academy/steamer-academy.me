import { Metadata } from "next";
import NotFoundContent from "@/components/wrappers/error-page";

export const metadata: Metadata = {
  title: "STEAMer Academy | 404 Page Not Found",
  description: "The page you are looking for doesn't exist or has been moved.",
};

export default function NotFound() {
  return <NotFoundContent />;
}

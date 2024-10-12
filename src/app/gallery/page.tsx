import { Metadata } from "next";
import GalleryGrid from "./GalleryGrid";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "STEAMer Academy | Gallery",
  description:
    "Explore our gallery showcasing the exciting world of STEAM education at STEAMer Academy.",
};

const images = [
  { src: "/placeholder.webp", alt: "STEAM education illustration" },
  { src: "/placeholder.webp", alt: "Globe with face mask" },
  { src: "/placeholder.webp", alt: "Student silhouette in library" },
];

export default function GalleryPage() {
  return (
    <Layout>
      <div className="space-y-8 content-center text-center">
        <h1 className="mb-8 text-4xl font-bold">Gallery</h1>
        <p className="mb-8">
          Welcome to our gallery, where we showcase the exciting world of STEAM
          education at STEAMer Academy. These images capture the essence of our
          innovative learning environment and the enthusiasm of our students.
        </p>
        <GalleryGrid images={images} />
      </div>
    </Layout>
  );
}

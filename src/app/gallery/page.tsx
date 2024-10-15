import { Metadata } from "next";
import dynamic from "next/dynamic";

const TypewriterEffectSmooth = dynamic(() =>
  import("@/components/ui/typewriter-effect").then(
    (mod) => mod.TypewriterEffectSmooth,
  ),
);
const Layout = dynamic(() =>
  import("@/components/Layout").then((mod) => mod.default),
);
const GalleryGrid = dynamic(() =>
  import("./GalleryGrid").then((mod) => mod.default),
);

export const metadata: Metadata = {
  title: "STEAMer Academy | Gallery",
  description:
    "Explore our gallery showcasing the exciting world of STEAM education at STEAMer Academy.",
};

const images = [
  { src: "/GalleryImage1.webp", alt: "STEAM education illustration" },
  { src: "/GalleryImage2.webp", alt: "Globe with face mask" },
  { src: "/GalleryImage3.webp", alt: "Student silhouette in library" },
];

export default function GalleryPage() {
  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="mb-8 text-4xl font-bold">
          <TypewriterEffectSmooth
            words={[{ text: "Gallery" }]}
            className="mt-6 pt-6"
          />
        </h1>
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

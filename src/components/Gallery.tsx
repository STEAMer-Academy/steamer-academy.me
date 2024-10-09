import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { useStore } from "@nanostores/react";
import { themeStore } from "../stores/themeStore";

export default function Gallery() {
  const $theme = useStore(themeStore);

  const images = [
    { src: "/placeholder.webp", alt: "STEAM education illustration" },
    { src: "/placeholder.webp", alt: "Globe with face mask" },
    { src: "/placeholder.webp", alt: "Student silhouette in library" },
  ];

  return (
    <div>
      <Head>
        <meta
          name="description"
          content="Explore our gallery showcasing the exciting world of STEAM education at STEAMer Academy."
        />
      </Head>

      <div
        className={`space-y-8 ${$theme === "dark" ? "bg-[#1a1b26] text-[#a9b1d6]" : "bg-white text-gray-900"}`}
      >
        <h1 className="mb-8 text-4xl font-bold">Gallery</h1>
        <p className="mb-8">
          Welcome to our gallery, where we showcase the exciting world of STEAM
          education at STEAMer Academy. These images capture the essence of our
          innovative learning environment and the enthusiasm of our students.
        </p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative aspect-square"
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

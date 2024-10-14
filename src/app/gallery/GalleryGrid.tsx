"use client";

import Image from "next/image";
import { motion } from "framer-motion";
interface GalleryImage {
  src: string;
  alt: string;
}

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  return (
    <div className="space-y-8">
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
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

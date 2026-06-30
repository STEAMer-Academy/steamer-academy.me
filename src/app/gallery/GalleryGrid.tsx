"use client";

import Image from "next/legacy/image";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
}

export default function GalleryGrid({
  images,
  className,
}: {
  images: GalleryImage[];
  className?: string;
}) {
  return (
    <LazyMotion features={domAnimation}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <m.div
              key={image.src}
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
                className={cn("rounded-lg", className)}
                loading="eager"
              />
            </m.div>
          ))}
        </div>
      </div>
    </LazyMotion>
  );
}

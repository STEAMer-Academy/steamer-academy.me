import Image from '../components/Image'
import { motion } from 'framer-motion'
import React from 'react'

export default function Gallery() {
  const images = [
    { src: "/placeholder.webp?height=300&width=400", alt: "STEAM education illustration" },
    { src: "/placeholder.webp?height=300&width=400", alt: "Globe with face mask" },
    { src: "/placeholder.webp?height=300&width=400", alt: "Student silhouette in library" },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold mb-8">Gallery</h1>
      <p className="mb-8">Welcome to our gallery, where we showcase the exciting world of STEAM education at STEAMer Academy. These images capture the essence of our innovative learning environment and the enthusiasm of our students.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
  )
}

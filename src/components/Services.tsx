import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "../components/Image";
import { motion } from "framer-motion";
import React from "react";
import "../styles/globals.css";

export default function Services() {
  const services = [
    {
      title: "English Club",
      description:
        "Are you passionate about the English language? Do you dream of expressing yourself with confidence in English? Then look no further! Our English Club at STEAMer Academy is the perfect place for you.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "Code Club",
      description:
        "Dive into the world of coding with our Code Club! Whether you're a beginner or have some experience, our club offers a fun and collaborative environment to learn and grow your programming skills.",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      title: "24/7 Assistance",
      description:
        "We're always here to help! Our 24/7 assistance ensures that you have support whenever you need it. Whether it's a question about a lesson or technical support, we've got you covered.",
      image: "/placeholder.svg?height=200&width=300",
    },
  ];

  const reviews = [
    {
      name: "Tom S.",
      content:
        "The English Club has been a game-changer for my language skills!",
    },
    {
      name: "Liz S.",
      content: "Code Club made learning to program fun and accessible.",
    },
    {
      name: "Mike A.",
      content:
        "The 24/7 support is incredibly helpful. I always get quick responses.",
    },
  ];

  return (
    <div className="space-y-16">
      <section>
        <h1 className="text-4xl font-bold mb-8">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={300}
                    height={200}
                    className="rounded-lg"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button>Learn More</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-2">&quot;{review.content}&quot;</p>
                  <p className="font-bold">- {review.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

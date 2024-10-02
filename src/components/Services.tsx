import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { useStore } from "@nanostores/react";
import { themeStore } from "../stores/themeStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Services() {
  const $theme = useStore(themeStore);

  const services = [
    {
      title: "English Club",
      description:
        "Are you passionate about the English language? Do you dream of expressing yourself with confidence in English? Then look no further! Our English Club at STEAMer Academy is the perfect place for you.",
      image: "/placeholder.svg",
    },
    {
      title: "Code Club",
      description:
        "Dive into the world of coding with our Code Club! Whether you're a beginner or have some experience, our club offers a fun and collaborative environment to learn and grow your programming skills.",
      image: "/placeholder.svg",
    },
    {
      title: "24/7 Assistance",
      description:
        "We're always here to help! Our 24/7 assistance ensures that you have support whenever you need it. Whether it's a question about a lesson or technical support, we've got you covered.",
      image: "/placeholder.svg",
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
    <div>
      <Head>
        <meta
          name="description"
          content="Explore the services offered by STEAMer Academy, including English Club, Code Club, and 24/7 Assistance."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className={`space-y-16 ${$theme === "dark" ? "bg-[#1a1b26] text-[#a9b1d6]" : "bg-white text-gray-900"}`}
      >
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
                <Card
                  className={$theme === "dark" ? "bg-gray-800" : "bg-white"}
                >
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
                    <CardTitle
                      className={
                        $theme === "dark" ? "text-white" : "text-gray-900"
                      }
                    >
                      {service.title}
                    </CardTitle>
                    <CardDescription
                      className={
                        $theme === "dark" ? "text-gray-300" : "text-gray-600"
                      }
                    >
                      {service.description}
                    </CardDescription>
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
                <Card
                  className={$theme === "dark" ? "bg-gray-800" : "bg-white"}
                >
                  <CardContent className="pt-6">
                    <p
                      className={`mb-2 ${$theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                    >
                      &quot;{review.content}&quot;
                    </p>
                    <p
                      className={`font-bold ${$theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      - {review.name}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

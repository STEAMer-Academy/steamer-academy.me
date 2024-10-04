import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <Head>
        <meta
          name="description"
          content="STEAMer Academy offers comprehensive education in Science, Technology, Engineering, Arts, and Mathematics."
        />
      </Head>

      <div className="space-y-16">
        <section className="relative h-[600px] overflow-hidden">
          <Image
            src="/placeholder.webp"
            alt="A world of possibilities"
            objectFit="cover"
            priority={true}
            width={1920}
            height={1080}
            sizes="100vw"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center text-white"
            >
              <h1 className="text-5xl font-bold mb-4">
                A world of possibilities
              </h1>
              <p className="text-xl mb-8">
                STEAMer Academy is here to guide you on your learning journey
              </p>
              <Link href="https://discord.gg/Kqpbawj9KU" passHref>
                <Button size="lg">Get started</Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Learn with STEAMer</h2>
            <p className="mb-8">
              STEAMer Academy offers comprehensive education in Science,
              Technology, Engineering, Arts, and Mathematics. Our innovative
              approach combines hands-on learning with cutting-edge technology
              to prepare students for the challenges of tomorrow.
            </p>
            <Link href="https://www.steameracademy.me/services" aria-label="Learn More About Steamer Academy, by visiting the services page." passHref>
              <Button variant="outline">Learn More About Us</Button>
            </Link>
          </motion.div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8">New arrivals</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Course Title {i}</CardTitle>
                    <CardDescription>
                      Brief description of the course
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Image
                      src="/placeholder.webp"
                      alt={`Course ${i}`}
                      width={300}
                      height={200}
                      className="rounded-lg"
                    />
                  </CardContent>
                  <CardFooter>
                    <Button>Learn more</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-8">Create anything</h2>
            <p className="mb-8">
              Join us on this exciting journey! Explore our website, contact us
              today to learn more, and let STEAMer become the launchpad for your
              child&apos;s exploration and innovation!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <h3 className="text-4xl font-bold">150</h3>
                <p>Students enrolled</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold">Eco</h3>
                <p>Friendly approach</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold">10</h3>
                <p>Expert teachers</p>
              </div>
            </div>
          </motion.div>
        </section>

        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Get new content delivered directly to your inbox
            </h2>
            <form className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

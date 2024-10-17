"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useStore } from "@nanostores/react";
import { themeStore } from "@/stores/themeStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Service {
  title: string;
  description: string;
  image: string;
}

export default function ServicesList({ services }: { services: Service[] }) {
  const $theme = useStore(themeStore);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Responsive grid layout */}
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className={$theme === "dark" ? "bg-[#1a1b26]" : "bg-white"}>
            <CardHeader>
              <Image
                src={service.image}
                alt={service.title}
                width={300}
                height={200}
                className="rounded-lg w-full h-auto object-cover" // Adjusted to fit the card properly
              />
            </CardHeader>
            <CardContent>
              <CardTitle
                className={$theme === "dark" ? "text-white" : "text-gray-900"}
              >
                {service.title}
              </CardTitle>
              <CardDescription
                className={$theme === "dark" ? "text-gray-300" : "text-gray-600"}
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
  );
}

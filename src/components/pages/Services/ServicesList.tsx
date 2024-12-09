"use client";

import { motion } from "motion/react";
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
  Button,
} from "@/components/wrappers/ui";
import Link from "next/link";

interface Service {
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ServicesList({ services }: { services: Service[] }) {
  const $theme = useStore(themeStore);

  return (
    <div className="grid grid-cols-1 gap-8 p-10 sm:grid-cols-2 lg:grid-cols-3">
      {" "}
      {/* Responsive grid layout */}
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card
            className={`${$theme === "dark" ? "bg-[#1a1b26] hover:bg-gray-700" : "bg-white hover:bg-gray-100"} rounded-lg p-7 shadow-lg transition-transform hover:scale-105 hover:shadow-2xl`}
          >
            <CardHeader
              className={`text-xl font-semibold ${$theme === "dark" ? "text-white" : "text-gray-900"} mb-2 p-1`}
            >
              <Image
                src={service.image}
                alt={service.title}
                width={300}
                height={200}
                className="mx-auto"
                loading="eager"
              />
            </CardHeader>
            <CardContent>
              <CardTitle
                className={`text-lg ${$theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-4 p-4`}
              >
                {service.title}
              </CardTitle>
              <CardDescription
                className={`font-medium ${$theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              >
                {service.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Link href={service.link} prefetch={true}>
                <Button>Learn More</Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

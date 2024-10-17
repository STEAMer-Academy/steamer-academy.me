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
    <div className="grid grid-cols-1 gap-8 p-10 sm:grid-cols-2 lg:grid-cols-3"> {/* Responsive grid layout */}
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card 
            className={`${$theme === "dark" ? "bg-[#1a1b26] hover:bg-gray-700" : "bg-white hover:bg-gray-100"} 
            transform rounded-lg p-7 shadow-lg transition-transform hover:scale-105 hover:shadow-2xl`} 
            style={{ width: '350px', height: '450px' }}  // Set fixed width and height
          >
            <CardHeader 
              className={`text-xl font-semibold ${$theme === "dark" ? "text-white" : "text-gray-900"} mb-2 p-1`}
              style={{ height: '200px' }}  // Ensure a fixed height for the image area
            >
              <div className="flex justify-center items-center h-full"> {/* Flexbox to center image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  width={180}
                  height={180}
                  className="rounded-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle
                className={`text-lg ${$theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-4 p-4`}
              >
                {service.title}
              </CardTitle>
              <CardDescription
                className={`font-medium ${$theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                style={{ minHeight: '80px' }}  // Ensure a consistent content height
              >
                {service.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href={service.link}>
                <Button>Learn More</Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

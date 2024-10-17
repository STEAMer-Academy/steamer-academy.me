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
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className={`${$theme === "dark" ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-white to-gray-100"} hover:shadow-lg transition-shadow duration-300`}>
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
                className={`${$theme === "dark" ? "text-white" : "text-gray-900"} text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500`}
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
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none">Learn More</Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
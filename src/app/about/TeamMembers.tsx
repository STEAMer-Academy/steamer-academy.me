"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useStore } from "@nanostores/react";
import { themeStore } from "@/stores/themeStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  content: string;
}

export default function TeamMembers({ members }: { members: TeamMember[] }) {
  const $theme = useStore(themeStore);

  return (
    <div className="grid grid-cols-1 gap-8 p-10 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card
            className={`${$theme === "dark" ? "bg-[#1a1b26] hover:bg-gray-700" : "bg-white hover:bg-gray-100"} transform rounded-lg p-7 shadow-lg transition-transform hover:scale-105 hover:shadow-2xl`}
          >
            <CardHeader>
              <Image
                src={member.image}
                alt={member.name}
                width={200}
                height={200}
                className="mx-auto rounded-full"
              />
            </CardHeader>
            <CardContent className="p-12 pb-4 text-center">
              <CardHeader
                className={`text-xl font-semibold ${$theme === "dark" ? "text-white" : "text-gray-900"} mb-2 p-1`}
              >
                {member.name}
              </CardHeader>
              <CardTitle
                className={`text-lg ${$theme === "dark" ? "text-gray-400" : "text-gray-600"} mb-4 p-4`}
              >
                {member.role}
              </CardTitle>
              <CardDescription
                className={`font-medium ${$theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
              >
                {member.content}
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

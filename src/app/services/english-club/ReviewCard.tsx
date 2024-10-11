"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useStore } from "@nanostores/react";
import { themeStore } from "@/stores/themeStore";

interface ReviewCardProps {
  review: string;
  name: string;
  imageSrc: string;
}

export default function ReviewCard({
  review,
  name,
  imageSrc,
}: ReviewCardProps) {
  const $theme = useStore(themeStore);

  return (
    <Card className={$theme === "dark" ? "bg-[#1a1b26]" : "bg-white"}>
      <CardContent className="p-6">
        <p
          className={`mb-4 ${$theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
        >
          &quot;{review}&quot;
        </p>
        <div className="flex items-center">
          <Image
            src={imageSrc}
            alt={name}
            width={40}
            height={40}
            className="mr-4 rounded-full"
          />
          <span
            className={`font-semibold ${$theme === "dark" ? "text-white" : "text-gray-900"}`}
          >
            {name}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

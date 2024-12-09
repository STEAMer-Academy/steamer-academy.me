"use client";

import { motion } from "motion/react";
import { useStore } from "@nanostores/react";
import { themeStore } from "@/stores/themeStore";
import { Card, CardContent } from "@/components/wrappers/ui";

interface Review {
  name: string;
  content: string;
}

export default function ReviewsList({ reviews }: { reviews: Review[] }) {
  const $theme = useStore(themeStore);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {reviews.map((review, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card
            className={`${$theme === "dark" ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-white to-gray-100"} transition-shadow duration-300 hover:shadow-lg`}
          >
            <CardContent className="pt-6">
              <p
                className={`mb-2 ${$theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
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
  );
}

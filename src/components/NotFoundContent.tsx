"use client";

import { useRouter } from "next/navigation";
import { useStore } from "@nanostores/react";
import { themeStore } from "@/stores/themeStore";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function NotFoundContent() {
  const $theme = useStore(themeStore);
  const router = useRouter();

  return (
    <div
      className={`flex min-h-screen items-center justify-center ${$theme === "dark" ? "bg-[#1a1b26] text-[#c0caf5]" : "bg-white text-gray-900"}`}
    >
      <div className="text-center">
        <motion.h1
          className="mb-4 text-6xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>
        <motion.h2
          className="mb-4 text-3xl font-semibold text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Oops! Page Not Found
        </motion.h2>
        <motion.p
          className="mb-8 text-xl text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          The page you are looking for doesn&apos;t exist or has been moved.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            onClick={() => router.push("/")}
            className="px-6 py-3 text-lg"
          >
            Go Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

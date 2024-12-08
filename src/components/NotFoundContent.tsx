"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/wrapper";
import { motion } from "motion/react";

export default function NotFoundContent() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1b26] text-[#c0caf5]">
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
          className="mb-4 text-center text-3xl font-semibold"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Oops! Page Not Found
        </motion.h2>
        <motion.p
          className="mb-8 text-center text-xl"
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

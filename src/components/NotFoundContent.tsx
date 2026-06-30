"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/wrapper";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function NotFoundContent() {
  const router = useRouter();

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex min-h-screen items-center justify-center bg-[#1a1b26] text-[#c0caf5]">
        <div className="text-center">
          <m.h1
            className="mb-4 text-6xl font-bold"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            404
          </m.h1>
          <m.h2
            className="mb-4 text-center text-3xl font-semibold"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Oops! Page Not Found
          </m.h2>
          <m.p
            className="mb-8 text-center text-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            The page you are looking for doesn&apos;t exist or has been moved.
          </m.p>
          <m.div
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
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}

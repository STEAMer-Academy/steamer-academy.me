"use client";

import { motion } from "framer-motion";
import { useStore } from "@nanostores/react";
import { themeStore } from "@/stores/themeStore";

export default function AboutContent() {
  const $theme = useStore(themeStore);

  return (
    <section className={$theme === "dark" ? "text-[#a9b1d6]" : "text-gray-900"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="mb-8 text-4xl font-bold">About STEAMer Academy</h1>
        <p className="mb-4">
          At STEAMer, we&apos;re passionate about igniting a love for Science,
          Technology, Engineering, Arts, and Math (STEAM) in young minds. Our
          mission is to create a dynamic learning environment that fosters
          creativity, critical thinking, and innovation.
        </p>
        <p className="mb-4">
          Through our engaging and interactive programs, STEAMer empowers young
          learners to:
        </p>
        <ul className="mb-4 list-inside list-disc">
          <li>
            Discover the wonders of STEAM and make science exciting, engaging,
            and relevant.
          </li>
          <li>
            Develop critical thinking skills, be curious, and ask questions.
          </li>
          <li>
            Engage in hands-on learning experiences that encourage exploration
            and discovery.
          </li>
          <li>
            Foster collaboration and innovation: Teamwork is at the heart of our
            programs, where students learn to work together to solve problems.
          </li>
          <li>
            Build confidence and a sense of accomplishment through project-based
            learning.
          </li>
        </ul>
      </motion.div>
    </section>
  );
}

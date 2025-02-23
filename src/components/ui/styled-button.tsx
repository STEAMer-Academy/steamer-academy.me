"use client";

import React, { useState } from "react";
import { motion } from "motion/react";

const StyledButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="center h-full w-full items-center justify-center">
      <button
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded px-4 py-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span>Learn More </span>
        <motion.svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M5 12H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            transition={{
              duration: 0.2,
            }}
          />
          <motion.path
            d="M12 5L19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ x: 0 }}
            animate={{ x: isHovered ? 0 : -7 }}
            transition={{ duration: 0.2 }}
          />
        </motion.svg>
      </button>
    </div>
  );
};

export default StyledButton;

"use client";
import React, { useRef, useState } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useTransform,
  useScroll,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [svgHeight, setSvgHeight] = useState(0);
  const contentRef = (node: HTMLDivElement | null) => {
    if (node !== null) {
      setSvgHeight(node.offsetHeight);
    }
  };

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    },
  );
  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]),
    {
      stiffness: 500,
      damping: 90,
    },
  );

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        ref={ref}
        className={cn("relative h-full w-full", className)} // Removed max-width and margin auto
      >
        <div className="absolute top-3 -left-4 md:-left-20">
          <m.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              boxShadow:
                scrollYProgress.get() > 0
                  ? "none"
                  : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            className="border-netural-200 ml-[27px] flex h-4 w-4 items-center justify-center rounded-full border shadow-xs"
          >
            <m.div
              transition={{
                duration: 0.2,
                delay: 0.5,
              }}
              animate={{
                backgroundColor:
                  scrollYProgress.get() > 0 ? "white" : "var(--emerald-500)",
                borderColor:
                  scrollYProgress.get() > 0 ? "white" : "var(--emerald-600)",
              }}
              className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
            />
          </m.div>
          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width="20"
            height={svgHeight}
            className="ml-4 block"
            aria-hidden="true"
          >
            <m.path
              d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
              fill="none"
              stroke="#9091A0"
              strokeOpacity="0.16"
              transition={{
                duration: 10,
              }}
            ></m.path>
            <m.path
              d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="1.25"
              className="motion-reduce:hidden"
              transition={{
                duration: 10,
              }}
            ></m.path>
            <defs>
              <m.linearGradient
                id="gradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="0"
                y1={y1}
                y2={y2}
              >
                <stop stopColor="#18CCFC" stopOpacity="0"></stop>
                <stop stopColor="#18CCFC"></stop>
                <stop offset="0.325" stopColor="#6344F5"></stop>
                <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
              </m.linearGradient>
            </defs>
          </svg>
        </div>
        <div ref={contentRef}>{children}</div>
      </m.div>
    </LazyMotion>
  );
};

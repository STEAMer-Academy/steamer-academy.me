"use client";

import { useRef } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";
import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

const EMPTY_DOTS: NonNullable<MapProps["dots"]> = [];

const projectPoint = (lat: number, lng: number) => {
  const x = (lng + 180) * (800 / 360);
  const y = (90 - lat) * (400 / 180);
  return { x, y };
};

const createCurvedPath = (
  start: { x: number; y: number },
  end: { x: number; y: number },
) => {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 50;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
};

export function WorldMap({
  dots = EMPTY_DOTS,
  lineColor = "#0ea5e9",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const { theme } = useTheme();

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: "transparent",
  });

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative aspect-[2/1] w-full rounded-lg font-sans">
        <Image
          src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
          className="pointer-events-none h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] select-none"
          alt="world map"
          height="495"
          width="1056"
          draggable={false}
        />
        <svg
          ref={svgRef}
          viewBox="0 0 800 400"
          className="pointer-events-none absolute inset-0 h-full w-full select-none"
        >
          {dots.map((dot, i) => {
            const startPoint = projectPoint(dot.start.lat, dot.start.lng);
            const endPoint = projectPoint(dot.end.lat, dot.end.lng);
            return (
              <g
                key={`path-group-${dot.start.lat}-${dot.start.lng}-${dot.end.lat}-${dot.end.lng}`}
              >
                <m.path
                  d={createCurvedPath(startPoint, endPoint)}
                  fill="none"
                  stroke="url(#path-gradient)"
                  strokeWidth="1"
                  initial={{
                    pathLength: 0,
                  }}
                  animate={{
                    pathLength: 1,
                  }}
                  transition={{
                    duration: 1,
                    delay: 0.5 * i,
                    ease: "easeOut",
                  }}
                  key={`start-upper-${dot.start.lat}-${dot.start.lng}-${dot.end.lat}-${dot.end.lng}`}
                ></m.path>
              </g>
            );
          })}

          <defs>
            <linearGradient
              id="path-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {dots.map((dot) => (
            <g
              key={`points-group-${dot.start.lat}-${dot.start.lng}-${dot.end.lat}-${dot.end.lng}`}
            >
              <g key={`start-${dot.start.lat}-${dot.start.lng}`}>
                <circle
                  cx={projectPoint(dot.start.lat, dot.start.lng).x}
                  cy={projectPoint(dot.start.lat, dot.start.lng).y}
                  r="2"
                  fill={lineColor}
                />
                <circle
                  cx={projectPoint(dot.start.lat, dot.start.lng).x}
                  cy={projectPoint(dot.start.lat, dot.start.lng).y}
                  r="2"
                  fill={lineColor}
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="2"
                    to="8"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
              <g key={`end-${dot.end.lat}-${dot.end.lng}`}>
                <circle
                  cx={projectPoint(dot.end.lat, dot.end.lng).x}
                  cy={projectPoint(dot.end.lat, dot.end.lng).y}
                  r="2"
                  fill={lineColor}
                />
                <circle
                  cx={projectPoint(dot.end.lat, dot.end.lng).x}
                  cy={projectPoint(dot.end.lat, dot.end.lng).y}
                  r="2"
                  fill={lineColor}
                  opacity="0.5"
                >
                  <animate
                    attributeName="r"
                    from="2"
                    to="8"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.5"
                    to="0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </g>
          ))}
        </svg>
      </div>
    </LazyMotion>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";

const Loader: React.FC<{
  size?: number;
  color?: string;
  className?: string;
}> = ({ size = 100, color = "#ff727d", className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      width={size}
      height={size}
      className={cn("animate-spin", className)}
    >
      <g>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
          <g
            key={rotation}
            transform={`translate(${50 + 30 * Math.cos((rotation * Math.PI) / 180)}, ${50 + 30 * Math.sin((rotation * Math.PI) / 180)})`}
          >
            <g transform={`rotate(${rotation})`}>
              <circle fill={color} r="6" cy="0" cx="0">
                <animateTransform
                  attributeName="transform"
                  type="scale"
                  begin={`${-0.125 * (7 - index)}s`}
                  values="1.5 1.5;1 1"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill-opacity"
                  keyTimes="0;1"
                  dur="1s"
                  repeatCount="indefinite"
                  values="1;0"
                  begin={`${-0.125 * (7 - index)}s`}
                />
              </circle>
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default Loader;

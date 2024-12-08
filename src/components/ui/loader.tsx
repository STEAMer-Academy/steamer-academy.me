"use client";

import React from "react";
import { cn } from "@/lib/utils";

const Loader: React.FC<{
  size?: number;
  color?: string;
  className?: string;
}> = ({ size = 58, color = "#FFFFFF", className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 58 58"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(2 1)" stroke={color} strokeWidth="1.5">
          <circle cx="42.601" cy="11.462" r="5" fillOpacity="1" fill={color}>
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="1;0;0;0;0;0;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="49.063" cy="27.063" r="5" fillOpacity="0" fill={color}>
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;1;0;0;0;0;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="42.601" cy="42.663" r="5" fillOpacity="0" fill={color}>
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;1;0;0;0;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="27" cy="49.125" r="5" fillOpacity="0" fill={color}>
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;0;1;0;0;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="11.399" cy="42.663" r="5" fillOpacity="0" fill={color}>
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;0;0;1;0;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="4.938" cy="27.063" r="5" fillOpacity="0" fill={color}>
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;0;0;0;1;0;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="11.399" cy="11.462" r="5" fillOpacity="0" fill={color}>
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;0;0;0;0;1;0"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="27" cy="5" r="5" fillOpacity="0" fill={color}>
            <animate
              attributeName="fill-opacity"
              begin="0s"
              dur="1.3s"
              values="0;0;0;0;0;0;0;1"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </g>
    </svg>
  );
};

export default Loader;

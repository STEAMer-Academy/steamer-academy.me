"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useTransform,
} from "framer-motion";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  ref?: React.Ref<HTMLTextAreaElement>;
};

const Textarea = ({ className, ref, ...props }: TextareaProps) => {
  const radius = 100; // change this to increase the radius of the hover effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const sizeMV = useMotionValue(0);

  const backgroundStyle = useTransform(
    [mouseX, mouseY, sizeMV],
    ([x, y, size]) =>
      `radial-gradient(${size}px circle at ${x}px ${y}px, var(--blue-500), transparent 80%)`,
  );

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        style={{
          background: backgroundStyle,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => sizeMV.set(radius)}
        onMouseLeave={() => sizeMV.set(0)}
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
        <textarea
          className={cn(
            `shadow-input flex h-36 w-full resize-none rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:placeholder:text-neutral-600 dark:focus-visible:ring-neutral-600`,
            className,
          )}
          ref={ref}
          {...props}
        />
      </m.div>
    </LazyMotion>
  );
};

Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaProps };

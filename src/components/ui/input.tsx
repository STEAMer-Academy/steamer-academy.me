// Input component extends from shadcnui - https://ui.shadcn.com/docs/components/input
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

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
};

const Input = ({ className, type, ref, ...props }: InputProps) => {
  const radius = 100; // change this to increase the rdaius of the hover effect
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
        <input
          type={type}
          className={cn(
            `dark:placeholder-text-neutral-600 shadow-input flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-[2px] focus-visible:ring-neutral-400 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] dark:focus-visible:ring-neutral-600`,
            className,
          )}
          ref={ref}
          {...props}
        />
      </m.div>
    </LazyMotion>
  );
};
Input.displayName = "Input";

export { Input };
export type { InputProps };

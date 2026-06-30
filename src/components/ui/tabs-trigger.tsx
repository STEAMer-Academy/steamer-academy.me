"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const TabsTrigger = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof TabsPrimitive.Trigger>) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export { TabsTrigger };

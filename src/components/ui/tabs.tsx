"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { TabsTrigger } from "@/components/ui/tabs-trigger";

const Tabs = TabsPrimitive.Root;

const TabsList = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof TabsPrimitive.List>) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg p-1",
      className,
    )}
    {...props}
  />
);
TabsList.displayName = TabsPrimitive.List.displayName;

export { Tabs, TabsList, TabsTrigger };

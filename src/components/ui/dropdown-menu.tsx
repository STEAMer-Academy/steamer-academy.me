"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface DropdownProps {
  trigger: React.ReactNode;
  items: {
    label: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    disabled?: boolean;
    variant?: "default" | "destructive";
  }[];
  align?: "start" | "end" | "center";
  className?: string;
  triggerClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
}

export const DropdownMenu = React.forwardRef<HTMLDivElement, DropdownProps>(
  ({
    trigger,
    items,
    align = "start",
    className,
    triggerClassName,
    menuClassName,
    itemClassName,
  }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuPosition = {
      start: "left-0",
      end: "right-0",
      center: "left-1/2 -translate-x-1/2",
    };

    return (
      <div ref={dropdownRef} className={cn("relative inline-block", className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "inline-flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium transition-colors",
            "rounded-md bg-[#f4f0ec] hover:bg-gray-600 dark:bg-background",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            triggerClassName,
          )}
        >
          {trigger}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {isOpen && (
          <div
            className={cn(
              "absolute z-50 mt-2 min-w-[12rem] overflow-hidden",
              "rounded-md bg-[#f4f0ec] hover:bg-gray-600 dark:bg-background",
              "shadow-lg",
              "animate-in fade-in-0 zoom-in-95",
              menuPosition[align],
              menuClassName,
            )}
          >
            <div className="py-1">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick?.();
                    setIsOpen(false);
                  }}
                  disabled={item.disabled}
                  className={cn(
                    "flex w-full items-center px-4 py-2 text-sm",
                    "transition-colors duration-150",
                    item.disabled && "cursor-not-allowed opacity-50",
                    !item.disabled &&
                      "hover:bg-gray-100 dark:hover:bg-gray-700",
                    item.variant === "destructive" &&
                      "text-red-600 dark:text-red-400",
                    itemClassName,
                  )}
                >
                  {item.icon && (
                    <span className="mr-2 h-4 w-4">{item.icon}</span>
                  )}
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

DropdownMenu.displayName = "DropdownMenu";

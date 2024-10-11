"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ArrowDown01Icon } from "hugeicons-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <header className="border-b">
        <nav className="container mx-auto flex flex-wrap items-center justify-between space-y-2 px-4 py-4 md:space-y-0">
          <Link href="/" className="text-2xl font-bold">
            STEAMer Academy
          </Link>
          <div className="flex w-full flex-wrap items-center justify-center space-x-2 md:w-auto md:justify-end">
            <Button variant="ghost" asChild className="font-sans font-medium">
              <Link href="/">Home</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={toggleDropdown}
                  className="flex items-center space-x-1 font-sans font-medium"
                >
                  <span>Services</span>
                  <ArrowDown01Icon
                    rotate={isDropdownOpen ? 180 : 0}
                    style={{
                      width: "1rem",
                      height: "1rem",
                      transition: "transform 200ms",
                    }}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/services/english-club">English Club</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/services/code-club">Code Club</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" asChild className="font-sans font-medium">
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" asChild className="font-sans font-medium">
              <Link href="/gallery">Gallery</Link>
            </Button>
            <Button variant="ghost" asChild className="font-sans font-medium">
              <Link href="/blogs">Blogs</Link>
            </Button>
            <Button variant="ghost" asChild className="font-sans font-medium">
              <Link href="/contact">Contact</Link>
            </Button>
            <ThemeToggle />
          </div>
        </nav>
      </header>
    </div>
  );
}

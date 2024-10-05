import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { themeStore, setTheme } from "../stores/themeStore";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sun01Icon,
  Moon02Icon,
  ArrowDown01Icon,
  Facebook01Icon,
  Location01Icon,
  HelpCircleIcon,
  Mail01Icon,
  TelephoneIcon,
  Clock01Icon,
  CopyrightIcon,
} from "hugeicons-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const $theme = useStore(themeStore);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", $theme === "dark");
  }, [$theme]);

  const toggleTheme = () => {
    setTheme($theme === "light" ? "dark" : "light");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div
      className={`min-h-screen flex flex-col ${$theme === "dark" ? "dark bg-[#1a1b26] text-[#a9b1d6]" : "bg-white text-gray-900"}`}
    >
      <header className="border-b">
        <nav className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center space-y-2 md:space-y-0">
          <Link href="/" className="text-2xl font-bold">
            STEAMer Academy
          </Link>
          <div className="flex flex-wrap justify-center md:justify-end items-center space-x-2 w-full md:w-auto">
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
                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
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
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Switch themes"
            >
              {$theme === "light" ? (
                <Moon02Icon className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Sun01Icon className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button>
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <footer className="border-t">
        <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <h3 className="font-bold">
              <Location01Icon className="mr-2" />
              <span>Location</span>
            </h3>
            <p>Dhaka, Bangladesh</p>
          </div>
          <div>
            <h3 className="font-bold">
              <Clock01Icon className="mr-2" />
              <span>Hours</span>
            </h3>
            <p>Friday - Saturday</p>
            <p>8am - 8pm</p>
          </div>
          <div>
            <h3 className="font-bold">Social</h3>
            <Link href="#" className="hover:text-blue-600 transition-colors">
              <Facebook01Icon className="mr-2" />
              <span>Facebook</span>
            </Link>
          </div>
          <div>
            <h3 className="font-bold">
              <HelpCircleIcon className="mr-2" />
              <span>Contact</span>
            </h3>
            <p>
              <Mail01Icon className="mr-2" />
              <span>support@steameracademy.me</span>
            </p>
            <p>
              <TelephoneIcon className="mr-2" />
              <span>+88017 7585 4054</span>
            </p>
          </div>
        </div>
        <p className="text-center mt-8 text-sm text-gray-500">
          <CopyrightIcon className="mr-2" />{" "}
          <span>2024 STEAMer Academy. All rights reserved.</span>
        </p>
      </footer>
    </div>
  );
}

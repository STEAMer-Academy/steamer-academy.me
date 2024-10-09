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
  YoutubeIcon,
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

  const handleClick = () => {
    setIsDropdownOpen((prevState: boolean) => !prevState); // Toggle the dropdown state
  };

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
      className={`flex min-h-screen flex-col ${$theme === "dark" ? "dark bg-[#1a1b26] text-[#a9b1d6]" : "bg-white text-gray-900"}`}
    >
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
                    onClick={handleClick}
                    rotate={isDropdownOpen ? 180 : 0} // Apply rotation based on state
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
      <main className="container mx-auto flex-grow px-4 py-8">{children}</main>
      <footer className="border-t">
        <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 md:grid-cols-4">
          {/* Location Section */}
          <div className="flex flex-col items-start p-3 md:items-center">
            <h3 className="flex items-center space-x-2 font-bold">
              <Location01Icon className="h-6 w-6" />
              <span>Location</span>
            </h3>
            <p>Dhaka, Bangladesh</p>
          </div>

          {/* Hours Section */}
          <div className="flex flex-col items-start p-3 md:items-center">
            <h3 className="flex items-center space-x-2 font-bold">
              <Clock01Icon className="h-6 w-6" />
              <span>Hours</span>
            </h3>
            <p>Friday - Saturday</p>
            <p>8am - 8pm</p>
          </div>

          {/* Social Section */}
          <div className="flex flex-col items-start p-3 md:items-center">
            <h3 className="flex items-center space-x-2 font-bold">
              <YoutubeIcon className="h-6 w-6" />
              <span>Social</span>
            </h3>
            <Link href="#" className="transition-colors hover:text-blue-600">
              Facebook
            </Link>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-start p-3 md:items-center">
            <h3 className="flex items-center space-x-2 font-bold">
              <HelpCircleIcon className="h-6 w-6" />
              <span>Contact</span>
            </h3>
            <p className="flex items-center space-x-2">
              <Mail01Icon className="h-6 w-6" />
              <span>support@steameracademy.me</span>
            </p>
            <p className="flex items-center space-x-2">
              <TelephoneIcon className="h-6 w-6" />
              <span>+88017 7585 4054</span>
            </p>
          </div>
        </div>

        {/* Footer Copyright */}
        <p className="mt-8 text-center text-sm text-[#B0B0B0]">
          <div className="flex items-center justify-center space-x-2 p-6">
            <CopyrightIcon className="h-5 w-5" />
            <h3 className="font-bold">
              <span>2024 STEAMer Academy. All rights reserved.</span>
            </h3>
          </div>
        </p>
      </footer>
    </div>
  );
}

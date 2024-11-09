"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Input, Button, DropdownMenu } from "@/components/wrapper";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Search01Icon,
  Menu01Icon,
  Home07Icon,
  BookEditIcon,
  InformationCircleIcon,
  Image01Icon,
  File01Icon,
  CallIcon,
  LanguageSkillIcon,
  CodeIcon,
} from "hugeicons-react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

interface SearchItem {
  id: string;
  title: string;
  content: string;
  url: string;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 0);
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const performSearch = async () => {
      if (searchValue.length > 1) {
        const response = await fetch("/searchData.json");
        const data: SearchItem[] = await response.json();
        const results = data.filter(
          (item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.content.toLowerCase().includes(searchValue.toLowerCase()),
        );
        setSearchResults(results);
        setShowDropdown(true);
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    };

    performSearch();
  }, [searchValue]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setShowDropdown(false);
    }
  };

  const navItems = [
    { href: "/", label: "Home", icon: Home07Icon },
    { href: "/about", label: "About", icon: InformationCircleIcon },
    { href: "/gallery", label: "Gallery", icon: Image01Icon },
    { href: "/blogs", label: "Blogs", icon: File01Icon },
    { href: "/contact", label: "Contact", icon: CallIcon },
  ];

  const services = [
    {
      href: "/services/english-club",
      label: "English Club",
      icon: LanguageSkillIcon,
    },
    { href: "/services/code-club", label: "Code Club", icon: CodeIcon },
  ];

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/60 shadow-xl backdrop-blur-xl"
          : "bg-background",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2"
            prefetch={true}
          >
            <Image
              loading="eager"
              src="/favicon.png"
              alt="STEAMer Academy Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-2xl font-bold">STEAMer Academy</span>
          </Link>
          <div className="hidden items-center space-x-1 lg:flex">
            {navItems.slice(0, 2).map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                asChild
                className="font-sans font-medium"
              >
                <Link
                  href={item.href}
                  prefetch={true}
                  className="flex items-center"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
            <DropdownMenu
              trigger={
                <span className="flex items-center">
                  <BookEditIcon className="mr-2 h-4 w-4" />
                  Services
                </span>
              }
              items={services.map((service) => ({
                label: service.label,
                icon: <service.icon className="h-4 w-4" />,
                onClick: () => router.push(service.href),
              }))}
              align="start"
              className="font-sans font-medium"
            />
            {navItems.slice(2).map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                asChild
                className="font-sans font-medium"
              >
                <Link
                  href={item.href}
                  prefetch={true}
                  className="flex items-center"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>

          <div className="hidden items-center space-x-4 lg:flex">
            <div className="relative">
              <form onSubmit={handleSearch} className="relative">
                <Search01Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-64 pl-10"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </form>
              {showDropdown && searchResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-popover shadow-lg">
                  <ul className="max-h-60 overflow-auto rounded-md py-1 text-base">
                    {searchResults.map((result) => (
                      <li key={result.id}>
                        <Link
                          href={result.url}
                          prefetch={true}
                          className="block px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                          onClick={() => setShowDropdown(false)}
                        >
                          {result.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <ThemeToggle />
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu01Icon
                    className="h-6 w-6"
                    aria-label="Menu Icon For Smaller Devices"
                  />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" aria-describedby="Search Box">
                <nav className="flex flex-col space-y-4">
                  <div className="relative">
                    <form onSubmit={handleSearch} className="relative mb-4">
                      <Search01Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-10 pr-6"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                    </form>
                    {showDropdown && searchResults.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full rounded-md bg-popover shadow-lg">
                        <ul className="max-h-60 overflow-auto rounded-md py-1 text-base">
                          {searchResults.map((result) => (
                            <li key={result.id}>
                              <SheetClose asChild>
                                <Link
                                  href={result.url}
                                  prefetch={true}
                                  className="block px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                                  onClick={() => setShowDropdown(false)}
                                >
                                  {result.title}
                                </Link>
                              </SheetClose>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Button
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        asChild
                        className="justify-start font-sans font-medium"
                      >
                        <Link
                          href={item.href}
                          prefetch={true}
                          className="flex items-center"
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.label}
                        </Link>
                      </Button>
                    </SheetClose>
                  ))}
                  <DropdownMenu
                    trigger={
                      <span className="flex items-center">
                        <BookEditIcon className="mr-2 h-4 w-4" />
                        Services
                      </span>
                    }
                    items={services.map((service) => ({
                      label: service.label,
                      icon: <service.icon className="h-4 w-4" />,
                      onClick: () => {
                        router.push(service.href);
                        (document.querySelector('[data-radix-collection-item]') as HTMLElement)?.click();
                      },
                    }))}
                    align="start"
                    className="font-sans font-medium"
                  />
                  <ThemeToggle />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
"use client";

import { useState, useEffect, useMemo, useTransition, Suspense } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Form from "next/form";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  Input,
  Button,
  DropdownMenu,
} from "@/components/wrapper";
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
import Fuse from "fuse.js";
import { useSession } from "@/hooks/use-session";
import { authClient } from "@/lib/auth-client";
import Loader from "./ui/loader";

interface SearchItem {
  id: string;
  title: string;
  content: string;
  url: string;
}

const getIconForUrl = (url: string) => {
  if (url.includes("/blogs")) return File01Icon;
  if (url.includes("/gallery")) return Image01Icon;
  if (url.includes("/contact")) return CallIcon;
  if (url.includes("/about")) return InformationCircleIcon;
  if (url.includes("/services/code-club")) return CodeIcon;
  if (url.includes("/services/english-club")) return LanguageSkillIcon;
  return Home07Icon;
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchData, setSearchData] = useState<SearchItem[]>([]);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const fuse = useMemo(() => {
    return new Fuse(searchData, {
      keys: ["title", "content"],
      threshold: 0.3,
    });
  }, [searchData]);

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
    const fetchSearchData = async () => {
      const response = await fetch("/searchData.json");
      const data: SearchItem[] = await response.json();
      setSearchData(data);
    };

    fetchSearchData();
  }, []);

  useEffect(() => {
    const performSearch = () => {
      startTransition(() => {
        const results = fuse.search(searchValue).map((result) => result.item);
        setSearchResults(results.slice(0, 5)); // Limit to 5 results
        setShowDropdown(true);
      });
    };

    if (searchValue.length > 0) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchValue, fuse]);

  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + "...";
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

  const { session } = useSession();

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-opacity-60 shadow-xl backdrop-blur-xl" : "",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <nav className="mx-auto w-full p-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2"
            prefetch={true}
          >
            <Image
              src="/assets/Favicon/favicon.png"
              alt="STEAMer Academy Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-2xl font-bold">STEAMer Academy</span>
          </Link>
          <div className="hidden items-center space-x-4 lg:flex">
            <Button
              variant={pathname === "/" ? "secondary" : "ghost"}
              asChild
              className="font-sans font-medium"
            >
              <Link href="/" prefetch={true} className="flex items-center">
                <Home07Icon className="mr-2 size-4" />
                Home
              </Link>
            </Button>
            <DropdownMenu
              trigger={
                <span className="flex items-center">
                  <BookEditIcon className="mr-2 size-4" />
                  Services
                </span>
              }
              items={services.map((service) => ({
                label: service.label,
                icon: <service.icon className="size-4" />,
                onClick: () => router.push(service.href),
              }))}
              align="start"
              className="font-sans font-medium"
            />
            {navItems.slice(1).map((item) => (
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
                  <item.icon className="mr-2 size-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>
          <div className="hidden items-center space-x-4 lg:flex">
            <div className="relative">
              <Form action="/search" className="relative">
                <Search01Icon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  name="q"
                  placeholder="Search..."
                  className="w-64 pl-10"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                />
              </Form>
              {showDropdown && (
                <div className="absolute z-10 mt-1 w-full rounded-md bg-popover shadow-lg">
                  <ul className="max-h-60 overflow-auto rounded-md py-1 text-base">
                    {isPending ? (
                      <li className="px-4 py-2 text-muted-foreground">
                        Loading...
                      </li>
                    ) : searchResults.length > 0 ? (
                      searchResults.map((result) => {
                        const IconComponent = getIconForUrl(result.url);
                        return (
                          <li key={result.id}>
                            <Link
                              href={result.url}
                              prefetch={true}
                              className="flex items-center px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                              onClick={() => setShowDropdown(false)}
                            >
                              <IconComponent className="mr-2 size-4" />
                              {truncateContent(result.title, 50)}
                            </Link>
                          </li>
                        );
                      })
                    ) : (
                      <li className="px-4 py-2 text-muted-foreground">
                        No results found
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>
            {session ? (
              <Suspense fallback={<Loader />}>
                <Button onClick={() => authClient.signOut()}>Sign Out</Button>
              </Suspense>
            ) : (
              <>
                <Suspense fallback={<Loader />}>
                  <Button onClick={() => router.push("/auth/signin")}>
                    Sign In
                  </Button>
                  <Button onClick={() => router.push("/auth/signup")}>
                    Sign Up
                  </Button>
                </Suspense>
              </>
            )}
            <ThemeToggle />
          </div>

          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu01Icon
                    className="size-6"
                    aria-label="Menu Icon For Smaller Devices"
                  />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" aria-describedby="Search Box">
                <nav className="flex flex-col space-y-4">
                  <div className="relative">
                    <Form action="/search" className="relative mb-4">
                      <Search01Icon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="search"
                        name="q"
                        placeholder="Search..."
                        className="pl-10 pr-6"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowDropdown(true)}
                      />
                    </Form>
                    {showDropdown && (
                      <div className="absolute z-10 mt-1 w-full rounded-md bg-popover shadow-lg">
                        <ul className="max-h-60 overflow-auto rounded-md py-1 text-base">
                          {isPending ? (
                            <li className="px-4 py-2 text-muted-foreground">
                              Loading...
                            </li>
                          ) : searchResults.length > 0 ? (
                            searchResults.map((result) => {
                              const IconComponent = getIconForUrl(result.url);
                              return (
                                <li key={result.id}>
                                  <SheetClose asChild>
                                    <Link
                                      href={result.url}
                                      prefetch={true}
                                      className="flex items-center px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                                      onClick={() => setShowDropdown(false)}
                                    >
                                      <IconComponent className="mr-2 size-4" />
                                      {truncateContent(result.title, 50)}
                                    </Link>
                                  </SheetClose>
                                </li>
                              );
                            })
                          ) : (
                            <li className="px-4 py-2 text-muted-foreground">
                              No results found
                            </li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                  <SheetClose asChild>
                    <Button
                      variant={pathname === "/" ? "secondary" : "ghost"}
                      asChild
                      className="justify-start font-sans font-medium"
                    >
                      <Link
                        href="/"
                        prefetch={true}
                        className="flex items-center"
                      >
                        <Home07Icon className="mr-2 size-4" />
                        Home
                      </Link>
                    </Button>
                  </SheetClose>
                  <DropdownMenu
                    trigger={
                      <span className="flex items-center">
                        <BookEditIcon className="mr-2 size-4" />
                        Services
                      </span>
                    }
                    items={services.map((service) => ({
                      label: service.label,
                      icon: <service.icon className="size-4" />,
                      onClick: () => {
                        router.push(service.href);
                        (
                          document.querySelector(
                            "[data-radix-collection-item]",
                          ) as HTMLElement
                        )?.click();
                      },
                    }))}
                    align="start"
                    className="font-sans font-medium"
                  />
                  {navItems.slice(1).map((item) => (
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
                          <item.icon className="mr-2 size-4" />
                          {item.label}
                        </Link>
                      </Button>
                    </SheetClose>
                  ))}
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

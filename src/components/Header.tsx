"use client";

import { useEffect, useRef, useReducer, type FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
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
import type { ElementType } from "react";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";
import Fuse from "fuse.js";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

interface SearchItem {
  id: string;
  title: string;
  content: string;
  url: string;
}

// ── Module-level helpers ───────────────────────────────────────

function truncateContent(content: string, maxLength: number): string {
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength) + "...";
}

function getIconForUrl(url: string): ElementType {
  if (url.includes("/blogs")) return File01Icon;
  if (url.includes("/gallery")) return Image01Icon;
  if (url.includes("/contact")) return CallIcon;
  if (url.includes("/about")) return InformationCircleIcon;
  if (url.includes("/services/code-club")) return CodeIcon;
  if (url.includes("/services/english-club")) return LanguageSkillIcon;
  return Home07Icon;
}

// ── Reducers ───────────────────────────────────────────────────

interface ScrollState {
  isScrolled: boolean;
  isVisible: boolean;
}

type ScrollAction = {
  type: "SCROLL";
  isScrolled: boolean;
  isVisible: boolean;
};

function scrollReducer(state: ScrollState, action: ScrollAction): ScrollState {
  switch (action.type) {
    case "SCROLL":
      return { isScrolled: action.isScrolled, isVisible: action.isVisible };
    default:
      return state;
  }
}

interface SearchState {
  searchValue: string;
  searchResults: SearchItem[];
  showDropdown: boolean;
  searchData: SearchItem[];
}

type SearchAction =
  | { type: "SET_DATA"; data: SearchItem[] }
  | { type: "SET_VALUE"; value: string }
  | { type: "SET_RESULTS"; results: SearchItem[] }
  | { type: "SET_DROPDOWN"; show: boolean };

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, searchData: action.data };
    case "SET_VALUE":
      return { ...state, searchValue: action.value };
    case "SET_RESULTS":
      return { ...state, searchResults: action.results };
    case "SET_DROPDOWN":
      return { ...state, showDropdown: action.show };
    default:
      return state;
  }
}

// ── Sub-components ─────────────────────────────────────────────

interface SearchBarProps {
  searchValue: string;
  searchResults: SearchItem[];
  showDropdown: boolean;
  onValueChange: (value: string) => void;
  onFocus: () => void;
  onSubmit: (e: FormEvent) => void;
  onSelect: () => void;
  variant?: "desktop" | "mobile";
  linkWrapper?: (children: React.ReactNode) => React.ReactNode;
}

function SearchBar({
  searchValue,
  searchResults,
  showDropdown,
  onValueChange,
  onFocus,
  onSubmit,
  onSelect,
  variant = "desktop",
  linkWrapper,
}: SearchBarProps) {
  const inputClassName = variant === "mobile" ? "pr-6 pl-10" : "w-64 pl-10";

  return (
    <div className="relative">
      <form onSubmit={onSubmit} className="relative">
        <Search01Icon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          type="search"
          placeholder="Search..."
          className={inputClassName}
          value={searchValue}
          onChange={(e) => onValueChange(e.target.value)}
          onFocus={onFocus}
        />
      </form>
      {showDropdown && (
        <div className="bg-popover absolute z-10 mt-1 w-full rounded-md shadow-lg">
          <ul className="max-h-60 overflow-auto rounded-md py-1 text-base">
            {searchResults.length > 0 ? (
              searchResults.map((result) => {
                const IconComponent = getIconForUrl(result.url);
                return (
                  <li key={result.id}>
                    {linkWrapper ? (
                      linkWrapper(
                        <Link
                          href={result.url}
                          prefetch={true}
                          className="hover:bg-accent hover:text-accent-foreground flex items-center px-4 py-2"
                          onClick={onSelect}
                        >
                          <IconComponent className="mr-2 h-4 w-4" />
                          {truncateContent(result.title, 50)}
                        </Link>,
                      )
                    ) : (
                      <Link
                        href={result.url}
                        prefetch={true}
                        className="hover:bg-accent hover:text-accent-foreground flex items-center px-4 py-2"
                        onClick={onSelect}
                      >
                        <IconComponent className="mr-2 h-4 w-4" />
                        {truncateContent(result.title, 50)}
                      </Link>
                    )}
                  </li>
                );
              })
            ) : (
              <li className="text-muted-foreground px-4 py-2">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

interface NavItem {
  href: string;
  label: string;
  icon: ElementType;
}

const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: Home07Icon },
  { href: "/about", label: "About", icon: InformationCircleIcon },
  { href: "/gallery", label: "Gallery", icon: Image01Icon },
  { href: "/blogs", label: "Blogs", icon: File01Icon },
  { href: "/contact", label: "Contact", icon: CallIcon },
];

const services: NavItem[] = [
  {
    href: "/services/english-club",
    label: "English Club",
    icon: LanguageSkillIcon,
  },
  { href: "/services/code-club", label: "Code Club", icon: CodeIcon },
];

interface NavLinksProps {
  pathname: string;
  /** Called when a service dropdown item is clicked */
  onServiceClick: (href: string) => void;
}

function NavLinks({ pathname, onServiceClick }: NavLinksProps) {
  return (
    <>
      <Button
        variant={pathname === "/" ? "secondary" : "ghost"}
        asChild
        className="font-sans font-medium"
      >
        <Link href="/" prefetch={true} className="flex items-center">
          <Home07Icon className="mr-2 h-4 w-4" />
          Home
        </Link>
      </Button>
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
          onClick: () => onServiceClick(service.href),
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
          <Link href={item.href} prefetch={true} className="flex items-center">
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Link>
        </Button>
      ))}
    </>
  );
}

interface MobileMenuProps {
  pathname: string;
  searchValue: string;
  searchResults: SearchItem[];
  showDropdown: boolean;
  onSearchChange: (value: string) => void;
  onSearchFocus: () => void;
  onSearchSubmit: (e: FormEvent) => void;
  onSearchSelect: () => void;
  onServiceClick: (href: string) => void;
}

function MobileMenu({
  pathname,
  searchValue,
  searchResults,
  showDropdown,
  onSearchChange,
  onSearchFocus,
  onSearchSubmit,
  onSearchSelect,
  onServiceClick,
}: MobileMenuProps) {
  return (
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
          <SearchBar
            searchValue={searchValue}
            searchResults={searchResults}
            showDropdown={showDropdown}
            onValueChange={onSearchChange}
            onFocus={onSearchFocus}
            onSubmit={onSearchSubmit}
            onSelect={onSearchSelect}
            variant="mobile"
            linkWrapper={(children) => (
              <SheetClose asChild>{children}</SheetClose>
            )}
          />
          <SheetClose asChild>
            <Button
              variant={pathname === "/" ? "secondary" : "ghost"}
              asChild
              className="justify-start font-sans font-medium"
            >
              <Link href="/" prefetch={true} className="flex items-center">
                <Home07Icon className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
          </SheetClose>
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
                onServiceClick(service.href);
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
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            </SheetClose>
          ))}
          <Show when="signed-in">
            <Button variant="outline">
              <UserButton showName={true} />
            </Button>
          </Show>
          <Show when="signed-out">
            <Button variant="outline">
              <SignInButton mode="modal" />
            </Button>
          </Show>
          <ThemeToggle />
        </nav>
      </SheetContent>
    </Sheet>
  );
}

// ── Root component ─────────────────────────────────────────────

export default function Header() {
  const [scrollState, dispatchScroll] = useReducer(scrollReducer, {
    isScrolled: false,
    isVisible: true,
  });
  const lastScrollY = useRef(0);
  const [searchState, dispatchSearch] = useReducer(searchReducer, {
    searchValue: "",
    searchResults: [],
    showDropdown: false,
    searchData: [],
  });
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      dispatchScroll({
        type: "SCROLL",
        isScrolled: currentScrollY > 0,
        isVisible: currentScrollY < lastScrollY.current || currentScrollY < 10,
      });
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Static JSON file fetch — acceptable pattern since it loads a pre-built search index
  useEffect(() => {
    const fetchSearchData = async () => {
      const response = await fetch("/searchData.json");
      const data: SearchItem[] = await response.json();
      dispatchSearch({ type: "SET_DATA", data });
    };
    fetchSearchData();
  }, []);

  useEffect(() => {
    const fuse = new Fuse(searchState.searchData, {
      keys: ["title", "content"],
      threshold: 0.3,
    });
    const results = fuse
      .search(searchState.searchValue)
      .map((result) => result.item);
    dispatchSearch({
      type: "SET_RESULTS",
      results: results.slice(0, 5),
    });
    dispatchSearch({ type: "SET_DROPDOWN", show: true });
  }, [searchState.searchValue, searchState.searchData]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const value = searchState.searchValue;
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}`);
      dispatchSearch({ type: "SET_DROPDOWN", show: false });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrollState.isScrolled
          ? "bg-opacity-60 shadow-xl backdrop-blur-xl"
          : "",
        scrollState.isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <nav className="mx-auto w-full px-4 py-4">
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
          <div className="hidden items-center space-x-4 lg:flex">
            <NavLinks
              pathname={pathname}
              onServiceClick={(href) => router.push(href)}
            />
          </div>
          <div className="hidden items-center space-x-4 lg:flex">
            <SearchBar
              searchValue={searchState.searchValue}
              searchResults={searchState.searchResults}
              showDropdown={searchState.showDropdown}
              onValueChange={(value) =>
                dispatchSearch({ type: "SET_VALUE", value })
              }
              onFocus={() =>
                dispatchSearch({ type: "SET_DROPDOWN", show: true })
              }
              onSubmit={handleSearch}
              onSelect={() =>
                dispatchSearch({ type: "SET_DROPDOWN", show: false })
              }
            />
            <Show when="signed-in">
              <Button variant="outline">
                <UserButton showName={true} />
              </Button>
            </Show>
            <Show when="signed-out">
              <Button variant="outline">
                <SignInButton mode="modal" />
              </Button>
            </Show>
            <ThemeToggle />
          </div>

          <div className="lg:hidden">
            <MobileMenu
              pathname={pathname}
              searchValue={searchState.searchValue}
              searchResults={searchState.searchResults}
              showDropdown={searchState.showDropdown}
              onSearchChange={(value) =>
                dispatchSearch({ type: "SET_VALUE", value })
              }
              onSearchFocus={() =>
                dispatchSearch({ type: "SET_DROPDOWN", show: true })
              }
              onSearchSubmit={handleSearch}
              onSearchSelect={() =>
                dispatchSearch({ type: "SET_DROPDOWN", show: false })
              }
              onServiceClick={(href) => router.push(href)}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

"use client";

import { useEffect, useRef, useReducer, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
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

// ── Sub-components ─────────────────────────────────────────────

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-accent font-sans font-medium"
          >
            <BookEditIcon className="mr-2 h-4 w-4" />
            Services
            <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {services.map((service) => (
            <DropdownMenuItem
              key={service.href}
              onClick={() => onServiceClick(service.href)}
            >
              <service.icon className="h-4 w-4" />
              {service.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
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
  onServiceClick: (href: string) => void;
}

function MobileMenu({ pathname, onServiceClick }: MobileMenuProps) {
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="data-[state=open]:bg-accent justify-start font-sans font-medium"
              >
                <BookEditIcon className="mr-2 h-4 w-4" />
                Services
                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {services.map((service) => (
                <DropdownMenuItem
                  key={service.href}
                  onClick={() => onServiceClick(service.href)}
                >
                  <service.icon className="h-4 w-4" />
                  {service.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
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

export default function Header({ searchData }: { searchData?: string | null }) {
  const [scrollState, dispatchScroll] = useReducer(scrollReducer, {
    isScrolled: false,
    isVisible: true,
  });
  const lastScrollY = useRef(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchItems, setSearchItems] = useState<SearchItem[]>(
    searchData ? (JSON.parse(searchData) as SearchItem[]) : [],
  );
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

  // Load search data for the command palette
  useEffect(() => {
    if (searchData) return; // Already provided by server component
    const fetchSearchData = async () => {
      const response = await fetch("/searchData.json");
      const data: SearchItem[] = await response.json();
      setSearchItems(data);
    };
    fetchSearchData();
  }, [searchData]);

  // Cmd+K / Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Search01Icon className="h-5 w-5" />
            </Button>
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
              onServiceClick={(href) => router.push(href)}
            />
          </div>
        </div>
      </nav>

      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search pages and blogs..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchItems.length > 0 && (
            <CommandGroup heading="Results">
              {searchItems.map((item) => {
                const IconComponent = getIconForUrl(item.url);
                return (
                  <CommandItem
                    key={item.id}
                    value={item.title}
                    onSelect={() => {
                      router.push(item.url);
                      setSearchOpen(false);
                    }}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span>{truncateContent(item.title, 50)}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </header>
  );
}

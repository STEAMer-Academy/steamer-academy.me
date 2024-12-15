"use client";

import { useState, useEffect, useRef, MouseEvent, ComponentType } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, TargetAndTransition } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  Button,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DropdownMenu,
} from "@/components/wrappers/ui";
import { cn } from "@/lib/utils";
import {
  Search01Icon as Search,
  Menu01Icon as Menu,
  Home07Icon as Home,
  InformationCircleIcon as Info,
  Image01Icon as ImageIcon,
  File01Icon as FileText,
  SmartPhone01Icon as Phone,
  CodeIcon,
  LanguageSkillIcon,
  BookEditIcon,
  HugeiconsProps,
} from "hugeicons-react";
import ThemeToggle from "@/components/themeToggle/ThemeToggle";
import { useSession } from "@/hooks/use-session";
import { authClient } from "@/lib/auth/auth-client";

interface NavigationItem {
  href: string;
  label: string;
  icon: ComponentType<HugeiconsProps>;
}

interface SearchItem {
  id: string;
  title: string;
  content: string;
  url: string;
}

interface NavState {
  opacity: number;
  left: number;
  width: number;
}

const navigation: NavigationItem[] = [
  { href: "/about", label: "About", icon: Info },
  { href: "/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/blogs", label: "Blogs", icon: FileText },
  { href: "/contact", label: "Contact", icon: Phone },
];

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [searchData, setSearchData] = useState<SearchItem[]>([]);
  const [navState, setNavState] = useState<NavState>({
    opacity: 0,
    left: 0,
    width: 0,
  });

  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { session } = useSession();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
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

  const handleSearch = (query: string) => {
    const filtered = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.content.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchResults(filtered);
  };

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    const { width, left } = event.currentTarget.getBoundingClientRect();
    const parentLeft = navRef.current?.getBoundingClientRect().left || 0;

    setNavState({
      width,
      opacity: 1,
      left: left - parentLeft,
    });
  };

  const handleMouseLeave = () => {
    setNavState((prev) => ({
      ...prev,
      opacity: 0,
    }));
  };

  const services = [
    {
      href: "/services/english-club",
      label: "English Club",
      icon: LanguageSkillIcon,
    },
    { href: "/services/code-club", label: "Code Club", icon: CodeIcon },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          className={cn(
            "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
            lastScrollY > 0 ? "bg-opacity-80 backdrop-blur-lg" : "",
          )}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <nav className="mx-auto flex h-16 max-w-screen-2xl items-center px-4">
            <Link
              href="/"
              className="flex shrink-0 items-center"
              prefetch={true}
            >
              <Image
                src="/assets/Favicon/favicon.png"
                alt="Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
            </Link>

            <div className="hidden flex-1 justify-center md:flex">
              <div
                ref={navRef}
                className="relative flex items-center gap-1 p-1"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <Button
                    variant={pathname === "/" ? "secondary" : "ghost"}
                    asChild
                    className="font-sans font-medium"
                  >
                    <Link
                      href="/"
                      prefetch={true}
                      className="flex items-center"
                    >
                      <Home className="mr-2 size-4" />
                      Home
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
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
                </motion.div>
                {navigation.map((item) => (
                  <div
                    key={item.href}
                    className="relative z-10 px-4 py-2"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "relative text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary",
                      )}
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
                <motion.div
                  className="absolute left-0 top-0 z-0 h-full rounded-md bg-background"
                  animate={navState as TargetAndTransition}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="outline"
                className="gap-2 border-primary px-2 text-sm hover:bg-primary hover:text-primary-foreground"
                onClick={() => setOpen(true)}
              >
                <Search className="size-4" />
                <span className="hidden md:inline-flex">Search...</span>
                <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </Button>

              {!isMobile && <ThemeToggle />}

              {session ? (
                <Button size="sm" onClick={() => authClient.signOut()}>
                  Sign Out
                </Button>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => router.push("/auth/signin")}
                  >
                    Sign In
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => router.push("/auth/signup")}
                  >
                    Sign Up
                  </Button>
                </>
              )}

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="top" className="h-screen pt-20">
                  <nav className="flex flex-col space-y-4">
                    {navigation.map((item) => (
                      <Button
                        key={item.href}
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className="justify-start"
                        asChild
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Link href={item.href}>
                          <item.icon className="mr-2 size-4" />
                          {item.label}
                        </Link>
                      </Button>
                    ))}
                    <ThemeToggle />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </nav>

          <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput
              placeholder="Type a command or search..."
              onValueChange={handleSearch}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Search Results">
                {searchResults.map((item) => {
                  const Icon =
                    navigation.find((nav) => nav.href === item.url)?.icon ||
                    FileText;
                  return (
                    <CommandItem
                      key={item.id}
                      onSelect={() => {
                        router.push(item.url);
                        setOpen(false);
                      }}
                    >
                      <Icon className="mr-2 size-4" />
                      <span>{item.title}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import {
	Search01Icon,
	Menu01Icon,
	Home07Icon,
	BookEditIcon,
	InformationCircleIcon,
	Image01Icon,
	File01Icon,
	CallIcon,
	ArrowDown01Icon,
	LanguageSkillIcon,
	CodeIcon,
} from "hugeicons-react";
import Image from "next/image";

const ThemeToggle = dynamic(() =>
	import("./ThemeToggle").then((mod) => mod.default),
);

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [isVisible, setIsVisible] = useState(true);
	const [searchValue, setSearchValue] = useState("");
	const pathname = usePathname();

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
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="ghost"
									className="flex items-center space-x-1 font-sans font-medium"
								>
									<BookEditIcon className="h-4 w-4" />
									<span>Services</span>
									<ArrowDown01Icon className="ml-1 h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{services.map((service) => (
									<DropdownMenuItem key={service.href}>
										<Link
											href={service.href}
											prefetch={true}
											className="flex w-full items-center"
										>
											<service.icon className="mr-2 h-4 w-4" />
											{service.label}
										</Link>
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
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
							<Search01Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search..."
								className="w-64 pl-10"
								value={searchValue}
								onChange={(e) => setSearchValue(e.target.value)}
							/>
						</div>
						<ThemeToggle />
					</div>

					<div className="lg:hidden">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon">
									<Menu01Icon className="h-6 w-6" />
								</Button>
							</SheetTrigger>
							<SheetContent side="right">
								<nav className="flex flex-col space-y-4">
									<div className="relative mb-4">
										<Search01Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
										<Input
											type="search"
											placeholder="Search..."
											className="pl-10 pr-6"
											value={searchValue}
											onChange={(e) => setSearchValue(e.target.value)}
										/>
									</div>{" "}
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
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button
												variant="ghost"
												className="justify-start font-sans font-medium"
											>
												<BookEditIcon className="mr-2 h-4 w-4" />
												<span>Services</span>
												<ArrowDown01Icon className="ml-1 h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											{services.map((service) => (
												<DropdownMenuItem key={service.href}>
													<SheetClose asChild>
														<Link
															href={service.href}
															prefetch={true}
															className="flex w-full items-center"
														>
															<service.icon className="mr-2 h-4 w-4" />
															{service.label}
														</Link>
													</SheetClose>
												</DropdownMenuItem>
											))}
										</DropdownMenuContent>
									</DropdownMenu>
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

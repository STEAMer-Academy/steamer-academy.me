import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { motion, useTransform, useScroll } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { themeStore } from "../stores/themeStore";
import { useStore } from "@nanostores/react";
import { MultiplicationSignIcon, Tick01Icon } from "hugeicons-react";
import { GoogleGeminiEffect } from "../components/ui/google-gemini-effect";

interface FormData {
	email: string;
}

interface FormStatus {
	message: string;
	success: boolean;
}

export default function Home() {
	const $theme = useStore(themeStore);
	const [formData, setFormData] = useState<FormData>({ email: "" });
	const [formStatus, setFormStatus] = useState<FormStatus>({
		message: "",
		success: false,
	});

	const { scrollYProgress } = useScroll({
		offset: ["start start", "end start"],
	});

	const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
	const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
	const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
	const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
	const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.currentTarget;
		const data = new FormData(form);
		const formDataRecord: Record<string, string> = {};

		data.forEach((value, key) => {
			formDataRecord[key] = value as string;
		});

		const formDataEncoded = new URLSearchParams(formDataRecord).toString();

		try {
			await fetch("/__forms.html", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: formDataEncoded,
			});

			setFormStatus({
				message: "Thanks For Subscribing To Our Newsletter",
				success: true,
			});
			setFormData({ email: "" });
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : String(error);
			setFormStatus({
				message: `Newsletter submission error: ${errorMessage}`,
				success: false,
			});
		}
	};

	return (
		<div>
			<Head>
				<title>STEAMer Academy</title>
				<meta
					name="description"
					content="STEAMer Academy offers comprehensive education in Science, Technology, Engineering, Arts, and Mathematics."
				/>
			</Head>
			<div className="space-y-16">
				<section>
					<div>
						<div className="absolute flex items-center justify-center">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8 }}
								className="text-center text-white"
							>
								<GoogleGeminiEffect
									title="A world of possibilities"
									description="STEAMer Academy is here to guide you on your learning journey"
									pathLengths={[
										pathLengthFirst,
										pathLengthSecond,
										pathLengthThird,
										pathLengthFourth,
										pathLengthFifth,
									]}
									buttonName="Get started"
									buttonLink="https://discord.gg/Kqpbawj9KU"
									buttonClassName="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
								/>
							</motion.div>
						</div>
					</div>
				</section>

				<section className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<h2 className="text-3xl font-bold mb-8">Learn with STEAMer</h2>
						<p className="mb-8">
							STEAMer Academy offers comprehensive education in Science,
							Technology, Engineering, Arts, and Mathematics. Our innovative
							approach combines hands-on learning with cutting-edge technology
							to prepare students for the challenges of tomorrow.
						</p>
						<Link
							href="https://www.steameracademy.me/services"
							aria-label="Learn More About Steamer Academy, by visiting the services page."
							passHref
						>
							<Button variant="outline">Learn More About Us</Button>
						</Link>
					</motion.div>
				</section>

				<section className="container mx-auto px-4">
					<h2 className="text-3xl font-bold mb-8">New arrivals</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[1, 2, 3].map((i) => (
							<motion.div
								key={i}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: i * 0.1 }}
								viewport={{ once: true }}
							>
								<Card>
									<CardHeader>
										<CardTitle>Course Title {i}</CardTitle>
										<CardDescription>
											Brief description of the course
										</CardDescription>
									</CardHeader>
									<CardContent>
										<Image
											src="/placeholder.webp?height=200&width=300"
											alt={`Course ${i}`}
											width={300}
											height={200}
											className="rounded-lg"
										/>
									</CardContent>
									<CardFooter>
										<Button>Learn more</Button>
									</CardFooter>
								</Card>
							</motion.div>
						))}
					</div>
				</section>

				<section className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<h2 className="text-3xl font-bold mb-8">Create anything</h2>
						<p className="mb-8">
							Join us on this exciting journey! Explore our website, contact us
							today to learn more, and let STEAMer become the launchpad for your
							child&apos;s exploration and innovation!
						</p>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
							<div className="text-center">
								<h3 className="text-4xl font-bold">150</h3>
								<p>Students enrolled</p>
							</div>
							<div className="text-center">
								<h3 className="text-4xl font-bold">Eco</h3>
								<p>Friendly approach</p>
							</div>
							<div className="text-center">
								<h3 className="text-4xl font-bold">10</h3>
								<p>Expert teachers</p>
							</div>
						</div>
					</motion.div>
				</section>

				<section className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<h2 className="text-3xl font-bold mb-4">
							Get new content delivered directly to your inbox
						</h2>
						<form
							className="flex flex-col sm:flex-row gap-4"
							onSubmit={handleSubmit}
							method="POST"
							data-netlify="true"
							data-netlify-recaptcha="true"
						>
							<input type="hidden" name="form-name" value="newsletter" />
							<input
								type="email"
								name="email"
								placeholder="Enter your email"
								value={formData.email}
								onChange={handleChange}
								required
								className={`flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 ${
									$theme === "dark"
										? "bg-[#1a1b26] text-[#a9b1d6]"
										: "bg-white text-gray-900"
								}`}
							/>

							<div data-netlify-recaptcha="true"></div>

							<Button
								type="submit"
								className="w-full sm:w-auto px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
							>
								Subscribe
							</Button>
						</form>

						{formStatus.message && (
							<div className="mt-4 flex items-center">
								{formStatus.success ? (
									<>
										<Tick01Icon className="text-green-500" />
										<p className="ml-2 text-green-500">{formStatus.message}</p>
									</>
								) : (
									<>
										<MultiplicationSignIcon className="text-red-500" />
										<p className="ml-2 text-red-500">{formStatus.message}</p>
									</>
								)}
							</div>
						)}
					</motion.div>
				</section>
			</div>
		</div>
	);
}

import { Metadata } from "next";
import dynamic from "next/dynamic";

const TypewriterEffectSmooth = dynamic(
  () => import("@/components/ui/typewriter-effect").then((mod) => mod.TypewriterEffectSmooth)
);
const Layout = dynamic(() => import("@/components/Layout").then((mod) => mod.default));
const ContactInfo = dynamic(() => import("./ContactInfo").then((mod) => mod.default));
const ContactForm = dynamic(() => import("./ContactForm").then((mod) => mod.default));

export const metadata: Metadata = {
	title: "STEAMer Academy | Contact",
	description:
		"Get in touch with STEAMer Academy for any inquiries or feedback.",
};

export default function ContactPage() {
	return (
		<Layout>
			<div className="container mx-auto px-4 py-8">
				<h1 className="mb-6 text-4xl font-bold">
					<TypewriterEffectSmooth words={[{ text: "Contact" }]} className="mt-6 pt-6"/>
				</h1>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
					<ContactInfo />
					<ContactForm />
				</div>
			</div>
		</Layout>
	);
}

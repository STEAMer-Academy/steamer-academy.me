import { Metadata } from "next";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "STEAMer Academy | Contact",
  description:
    "Get in touch with STEAMer Academy for any inquiries or feedback.",
};

export default function ContactPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-4xl font-bold">Contact</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </Layout>
  );
}

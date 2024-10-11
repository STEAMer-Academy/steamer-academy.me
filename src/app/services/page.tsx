import { Metadata } from "next";
import ServicesList from "./ServicesList";
import ReviewsList from "./ReviewsList";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "STEAMer Academy | Services",
  description:
    "Explore the services offered by STEAMer Academy, including English Club, Code Club, and 24/7 Assistance.",
};

const services = [
  {
    title: "English Club",
    description:
      "Are you passionate about the English language? Do you dream of expressing yourself with confidence in English? Then look no further! Our English Club at STEAMer Academy is the perfect place for you.",
    image: "/placeholder.webp",
  },
  {
    title: "Code Club",
    description:
      "Dive into the world of coding with our Code Club! Whether you're a beginner or have some experience, our club offers a fun and collaborative environment to learn and grow your programming skills.",
    image: "/placeholder.webp",
  },
  {
    title: "24/7 Assistance",
    description:
      "We're always here to help! Our 24/7 assistance ensures that you have support whenever you need it. Whether it's a question about a lesson or technical support, we've got you covered.",
    image: "/placeholder.webp",
  },
];

const reviews = [
  {
    name: "Tom S.",
    content: "The English Club has been a game-changer for my language skills!",
  },
  {
    name: "Liz S.",
    content: "Code Club made learning to program fun and accessible.",
  },
  {
    name: "Mike A.",
    content:
      "The 24/7 support is incredibly helpful. I always get quick responses.",
  },
];

export default function ServicesPage() {
  return (
    <Layout>
      <div className="space-y-16">
        <section>
          <h1 className="mb-8 text-4xl font-bold">Our Services</h1>
          <ServicesList services={services} />
        </section>

        <section>
          <h2 className="mb-8 text-3xl font-bold">Reviews</h2>
          <ReviewsList reviews={reviews} />
        </section>
      </div>
    </Layout>
  );
}

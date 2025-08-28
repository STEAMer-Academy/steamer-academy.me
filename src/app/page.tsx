import Link from "next/link";
import {
  TypewriterEffectSmooth,
  Layout,
  GalleryGrid,
} from "@/components/wrapper";
import { WorldMap } from "@/components/ui/world-map";
import { Metadata } from "next";
import StyledButton from "@/components/ui/styled-button";

const images = [
  {
    src: "/RootImage1.webp",
    alt: "New Arrival 1",
  },
  {
    src: "/RootImage2.webp",
    alt: "New Arrival 2",
  },
  {
    src: "/RootImage3.webp",
    alt: "New Arrival 3",
  },
];

export const metadata: Metadata = {
  title: "STEAMer Academy | Home",
  description:
    "STEAMer Academy offers comprehensive education in Science, Technology, Engineering, Arts, and Mathematics.",
  openGraph: {
    title: "STEAMer Academy",
    description:
      "STEAMer Academy offers comprehensive education in Science, Technology, Engineering, Arts, and Mathematics.",
    url: "https://steamer-academy.vercel.app/",
    type: "website",
  },
  twitter: {
    site: "https://steamer-academy.vercel.app/",
    creator: "Muntasir Mahmud",
    title: "STEAMer Academy",
    description:
      "STEAMer Academy offers comprehensive education in Science, Technology, Engineering, Arts, and Mathematics.",
    card: "summary_large_image",
    images: "https://steamer-academy.vercel.app/link-preview-images/home.webp",
  },
};

export default function Home() {
  return (
    <Layout>
      <div className="space-y-6">
        <section className="relative flex h-screen w-full flex-row items-center justify-center py-20 md:h-auto">
          <div className="relative mx-auto h-full w-full max-w-7xl px-4 md:h-[40rem]">
            <div>
              <h2 className="text-center text-xl font-bold text-black md:text-4xl dark:text-white">
                <TypewriterEffectSmooth
                  words={[
                    {
                      text: "A",
                    },
                    {
                      text: "World",
                    },
                    {
                      text: "Of",
                    },
                    {
                      text: "Possibilities",
                    },
                  ]}
                />
              </h2>
              <p className="mx-auto mb-8 max-w-sm space-y-4 text-center text-base font-normal text-neutral-700 md:text-lg dark:text-neutral-200">
                A vibrant community dedicated to inspiring, educating, and
                supporting the next generation of leaders in Science,
                Technology, Engineering, Arts, and Math.
              </p>
              <div className="text-center">
                <Link href="https://discord.gg/Kqpbawj9KU" passHref>
                  <center>
                    <StyledButton />
                  </center>
                </Link>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 w-full from-transparent select-none" />
            <div className="-bottom-20 z-10 h-[30vh] w-full md:h-full">
              <WorldMap
                dots={[
                  {
                    start: { lat: 64.2008, lng: -149.4937 },
                    end: { lat: 34.0522, lng: -118.2437 },
                  }, // Alaska → Los Angeles
                  {
                    start: { lat: 64.2008, lng: -149.4937 },
                    end: { lat: -15.7975, lng: -47.8919 },
                  }, // Alaska → Brasília
                  {
                    start: { lat: -15.7975, lng: -47.8919 },
                    end: { lat: 38.7223, lng: -9.1393 },
                  }, // Brasília → Lisbon
                  {
                    start: { lat: 51.5074, lng: -0.1278 },
                    end: { lat: 28.6139, lng: 77.209 },
                  }, // London → New Delhi
                  {
                    start: { lat: 28.6139, lng: 77.209 },
                    end: { lat: 43.1332, lng: 131.9113 },
                  }, // New Delhi → Vladivostok
                  {
                    start: { lat: 28.6139, lng: 77.209 },
                    end: { lat: -1.2921, lng: 36.8219 },
                  }, // New Delhi → Nairobi
                  {
                    start: { lat: 40.7128, lng: -74.006 },
                    end: { lat: 48.8566, lng: 2.3522 },
                  }, // New York → Paris
                  {
                    start: { lat: 35.6895, lng: 139.6917 },
                    end: { lat: -33.8688, lng: 151.2093 },
                  }, // Tokyo → Sydney
                  {
                    start: { lat: -33.8688, lng: 151.2093 },
                    end: { lat: -34.6037, lng: -58.3816 },
                  }, // Sydney → Buenos Aires
                  {
                    start: { lat: -34.6037, lng: -58.3816 },
                    end: { lat: 55.7558, lng: 37.6173 },
                  }, // Buenos Aires → Moscow
                  {
                    start: { lat: 55.7558, lng: 37.6173 },
                    end: { lat: 39.9042, lng: 116.4074 },
                  }, // Moscow → Beijing
                  {
                    start: { lat: 39.9042, lng: 116.4074 },
                    end: { lat: -22.9068, lng: -43.1729 },
                  }, // Beijing → Rio de Janeiro
                  {
                    start: { lat: -22.9068, lng: -43.1729 },
                    end: { lat: 37.7749, lng: -122.4194 },
                  }, // Rio de Janeiro → San Francisco
                  {
                    start: { lat: 37.7749, lng: -122.4194 },
                    end: { lat: 1.3521, lng: 103.8198 },
                  }, // San Francisco → Singapore
                  {
                    start: { lat: 1.3521, lng: 103.8198 },
                    end: { lat: 55.9533, lng: -3.1883 },
                  }, // Singapore → Edinburgh
                  {
                    start: { lat: 55.9533, lng: -3.1883 },
                    end: { lat: 19.4326, lng: -99.1332 },
                  }, // Edinburgh → Mexico City
                  {
                    start: { lat: 19.4326, lng: -99.1332 },
                    end: { lat: -37.8136, lng: 144.9631 },
                  }, // Mexico City → Melbourne
                  {
                    start: { lat: -37.8136, lng: 144.9631 },
                    end: { lat: 52.52, lng: 13.405 },
                  }, // Melbourne → Berlin
                  {
                    start: { lat: 52.52, lng: 13.405 },
                    end: { lat: 6.5244, lng: 3.3792 },
                  }, // Berlin → Lagos
                  {
                    start: { lat: 6.5244, lng: 3.3792 },
                    end: { lat: 59.3293, lng: 18.0686 },
                  }, // Lagos → Stockholm
                  {
                    start: { lat: 59.3293, lng: 18.0686 },
                    end: { lat: 35.6895, lng: 51.389 },
                  }, // Stockholm → Tehran
                  {
                    start: { lat: 35.6895, lng: 51.389 },
                    end: { lat: -26.2041, lng: 28.0473 },
                  }, // Tehran → Johannesburg
                  {
                    start: { lat: -26.2041, lng: 28.0473 },
                    end: { lat: 25.276987, lng: 55.296249 },
                  }, // Johannesburg → Dubai
                  {
                    start: { lat: 25.276987, lng: 55.296249 },
                    end: { lat: -12.0464, lng: -77.0428 },
                  }, // Dubai → Lima
                  {
                    start: { lat: -12.0464, lng: -77.0428 },
                    end: { lat: 50.1109, lng: 8.6821 },
                  }, // Lima → Frankfurt
                  {
                    start: { lat: 50.1109, lng: 8.6821 },
                    end: { lat: 31.2304, lng: 121.4737 },
                  }, // Frankfurt → Shanghai
                  {
                    start: { lat: 31.2304, lng: 121.4737 },
                    end: { lat: 41.0082, lng: 28.9784 },
                  }, // Shanghai → Istanbul
                  {
                    start: { lat: 41.0082, lng: 28.9784 },
                    end: { lat: -23.5505, lng: -46.6333 },
                  }, // Istanbul → São Paulo
                  {
                    start: { lat: -23.5505, lng: -46.6333 },
                    end: { lat: 13.7563, lng: 100.5018 },
                  }, // São Paulo → Bangkok
                  {
                    start: { lat: 13.7563, lng: 100.5018 },
                    end: { lat: 40.4168, lng: -3.7038 },
                  }, // Bangkok → Madrid
                  {
                    start: { lat: 40.4168, lng: -3.7038 },
                    end: { lat: -4.4419, lng: 15.2663 },
                  }, // Madrid → Kinshasa
                  {
                    start: { lat: -4.4419, lng: 15.2663 },
                    end: { lat: 45.4642, lng: 9.19 },
                  }, // Kinshasa → Milan
                  {
                    start: { lat: 45.4642, lng: 9.19 },
                    end: { lat: -29.8587, lng: 31.0218 },
                  }, // Milan → Durban
                  {
                    start: { lat: -29.8587, lng: 31.0218 },
                    end: { lat: 35.6762, lng: 139.6503 },
                  }, // Durban → Tokyo
                ]}
              />
            </div>
          </div>
        </section>
        <section className="container mx-auto mt-5 px-4 pt-8">
          <h2 className="mb-8 text-center text-3xl font-bold">
            <TypewriterEffectSmooth
              words={[
                {
                  text: "Learn",
                },
                {
                  text: "with",
                },
                {
                  text: "STEAMer",
                },
              ]}
              className="mt-7 pt-10"
            />
          </h2>
          <p className="mb-8">
            At STEAMer Academy, we’re building a vibrant community where
            students can explore the limitless opportunities within Science,
            Technology, Engineering, Arts, and Mathematics. Our mission is
            simple: to ignite curiosity, foster creativity, and empower learners
            to solve real-world challenges through innovation and collaboration.
          </p>
          <div className="content-center text-center">
            <Link
              href="/services"
              aria-label="Learn More About Steamer Academy, by visiting the services page."
              prefetch={true}
              passHref
            >
              <center>
                <StyledButton />
              </center>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">
            <TypewriterEffectSmooth
              words={[
                {
                  text: "New",
                },
                {
                  text: "arrivals",
                },
              ]}
            />
          </h2>
          <p className="mb-8">
            We provide a dynamic platform filled with resources, projects, and
            opportunities to develop practical skills and theoretical knowledge.
            From coding and robotics to art and engineering, we encourage
            students to connect their passions with purpose and turn ideas into
            impactful creations. Learning at STEAMer Academy goes beyond
            textbooks. It’s about discovering your potential, exploring exciting
            fields, and working with peers who share your passion for growth.
            Whether you’re a budding scientist, an aspiring engineer, or a
            curious learner eager to explore, there’s a place for you here.
          </p>
          <GalleryGrid images={images} className="mb-8 space-y-8" />
        </section>

        <section className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">
            <TypewriterEffectSmooth
              words={[
                {
                  text: "Create",
                },
                {
                  text: "anything",
                },
              ]}
            />
          </h2>
          <p className="mb-8">
            Join us on this exciting journey! Explore our website, contact us
            today to learn more, and let STEAMer become the launchpad for your
            child&apos;s exploration and innovation!
          </p>
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
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
        </section>
      </div>
    </Layout>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Globe } from "@/components/Globe";
import GalleryGrid from "./gallery/GalleryGrid";

const TypewriterEffectSmooth = dynamic(() =>
  import("../components/ui/typewriter-effect").then(
    (mod) => mod.TypewriterEffectSmooth,
  ),
);
const Layout = dynamic(() =>
  import("../components/Layout").then((mod) => mod.default),
);

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
};

export default function Home() {
  return (
    <Layout>
      <div className="space-y-6">
        <section className="relative flex h-screen w-full flex-row items-center justify-center py-20 md:h-auto bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="relative mx-auto h-full w-full max-w-7xl px-4 md:h-[40rem]">
            <div>
              <h2 className="text-center text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 md:text-4xl">
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
              <p className="mx-auto mb-8 mt-2 max-w-md text-center text-base font-normal text-neutral-700 dark:text-neutral-200 md:text-lg">
                STEAMer Academy Is Here To Guide You On Your Learning Journey
              </p>
              <div className="text-center">
                <Link href="https://discord.gg/Kqpbawj9KU" passHref>
                  <div className="space-y-3">
                    <Button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        Get Started
                      </span>
                    </Button>
                  </div>
                </Link>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 w-full select-none from-transparent" />
            <div className="-bottom-20 z-10 h-[30vh] w-full md:h-full">
              <Globe />
            </div>
          </div>
        </section>
        <section className="container mx-auto mt-5 px-4 pt-8 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg">
          <h2 className="mb-8 text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
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
          <p className="mb-8 text-gray-700 dark:text-gray-300">
            STEAMer Academy offers comprehensive education in Science,
            Technology, Engineering, Arts, and Mathematics. Our innovative
            approach combines hands-on learning with cutting-edge technology to
            prepare students for the challenges of tomorrow.
          </p>
          <div className="content-center text-center pb-8">
            <Link
              href="/services"
              aria-label="Learn More About Steamer Academy, by visiting the services page."
              passHref
            >
              <Button variant="outline" className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white border-none">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </section>

        <section className="container mx-auto px-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg">
          <h2 className="mb-8 text-3xl font-bold pt-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">New arrivals</h2>
          <p className="mb-8 text-gray-700 dark:text-gray-300">
            STEAMER Academy goes beyond traditional language learning. We strive
            to ignite students curiosity, fostering a love for learning,
            critical thinking skills, and creativity. Our classes equip them
            with the communication skills they need to thrive in an increasingly
            interconnected world.
          </p>
          <GalleryGrid images={images} className="mb-8 space-y-8" />
        </section>

        <section className="container mx-auto px-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg">
          <h2 className="mb-8 text-center text-3xl font-bold pt-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
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
          <p className="mb-8 text-gray-700 dark:text-gray-300">
            Join us on this exciting journey! Explore our website, contact us
            today to learn more, and let STEAMer become the launchpad for your
            child&apos;s exploration and innovation!
          </p>
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-gray-700 dark:to-gray-600 rounded-lg">
              <h3 className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">150</h3>
              <p className="text-gray-700 dark:text-gray-300">Students enrolled</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-teal-100 dark:from-gray-700 dark:to-gray-600 rounded-lg">
              <h3 className="text-4xl font-bold text-green-600 dark:text-green-400">Eco</h3>
              <p className="text-gray-700 dark:text-gray-300">Friendly approach</p>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-lg">
              <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400">10</h3>
              <p className="text-gray-700 dark:text-gray-300">Expert teachers</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
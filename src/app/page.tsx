import Link from "next/link";
import { Globe } from "@/components/wrappers/pages/Home";
import { Metadata } from "next";
import { StyledButton, TypewriterEffectSmooth } from "@/components/wrappers/ui";
import { Layout } from "@/components/wrappers/headerAndFooter";
import { GalleryGrid } from "@/components/wrappers/pages/Gallery";

const images = [
  {
    src: "/assets/Home/RootImage1.webp",
    alt: "New Arrival 1",
  },
  {
    src: "/assets/Home/RootImage2.webp",
    alt: "New Arrival 2",
  },
  {
    src: "/assets/Home/RootImage3.webp",
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
    url: "https://www.steameracademy.me/",
    type: "website",
  },
  twitter: {
    site: "https://www.steameracademy.me/",
    creator: "Muntasir Mahmud",
    title: "STEAMer Academy",
    description:
      "STEAMer Academy offers comprehensive education in Science, Technology, Engineering, Arts, and Mathematics.",
    card: "summary_large_image",
    images: "https://www.steameracademy.me/link-preview-images/home.webp",
  },
};

export default function Home() {
  return (
    <Layout>
      <div className="space-y-6">
        <section className="relative flex h-screen w-full flex-row items-center justify-center py-20 md:h-auto">
          <div className="relative mx-auto size-full max-w-7xl px-4 md:h-[40rem]">
            <div>
              <h2 className="text-center text-xl font-bold text-black dark:text-white md:text-4xl">
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
              <p className="mx-auto mb-8 max-w-sm space-y-4 text-center text-base font-normal text-neutral-700 dark:text-neutral-200 md:text-lg">
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
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 w-full select-none from-transparent" />
            <div className="-bottom-20 z-10 h-[30vh] w-full md:h-full">
              <Globe />
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

import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CodeClub() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Code Club - STEAMer Academy</title>
        <meta
          name="description"
          content="Join our Code Club and learn programming skills"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mb-12 flex items-center justify-between">
        <h1 className="text-2xl font-bold">STEAMer Academy</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <h2 className="mb-8 text-3xl font-bold">Our services</h2>
        <h1 className="mb-12 text-5xl font-bold">CODE club</h1>

        <section className="mb-12">
          <h3 className="mb-4 text-2xl font-semibold">What is Code Club?</h3>
          <p>
            At Code Club, we aim to cultivate children&apos;s love and curiosity
            for coding. Our clubs offer a fun and engaging environment for
            children to learn programming skills, develop problem-solving
            abilities, and unleash their creativity through coding projects. We
            believe that coding is an essential skill for the future, and
            we&apos;re here to make learning fun!
          </p>
        </section>

        <section className="mb-12">
          <h3 className="mb-4 text-2xl font-semibold">
            What happens at a club?
          </h3>
          <p>
            At our Code Club sessions, young coders embark on exciting projects
            using the Scratch programming language, created by MIT. They learn
            to create their own interactive stories, games, and animations while
            developing computational thinking skills. Our sessions are guided by
            experienced mentors who provide support and encouragement, fostering
            a collaborative and fun learning environment.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="mb-4 text-2xl font-semibold">What is coding?</h3>
          <p>
            Coding, also known as computer programming, is the process of
            creating instructions that tell a computer what to do. It&apos;s
            like writing a recipe, but instead of cooking, you&apos;re telling a
            computer how to perform tasks or solve problems. Learning to code
            helps develop logical thinking, creativity, and problem-solving
            skills - abilities that are valuable in many aspects of life and
            future careers.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="mb-4 text-2xl font-semibold">Support</h3>
          <p>
            Code Club is supported by the Raspberry Pi Foundation, a registered
            UK charity. Together, we are part of a global movement to put the
            power of computing and digital making into the hands of people all
            over the world. We provide free resources and support to help
            educators run engaging coding sessions for young people.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="mb-4 text-2xl font-semibold">Join Now</h3>
          <p className="mb-4">
            Ready to start your coding adventure? Join our Code Club and unlock
            a world of creativity and innovation!
          </p>
          <Button variant="default">Sign Up</Button>
        </section>

        <section className="mb-12">
          <h3 className="mb-8 text-2xl font-semibold">Reviews</h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex items-start">
              <Image
                src="/placeholder-avatar.png"
                alt="John D."
                width={50}
                height={50}
                className="mr-4 rounded-full"
              />
              <div>
                <p className="mb-2">
                  &quot;Code Club has been an amazing experience for my
                  daughter. She&apos;s learned so much and really enjoys the
                  projects!&quot;
                </p>
                <p className="font-semibold">John D.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Image
                src="/placeholder-avatar.png"
                alt="Sarah M."
                width={50}
                height={50}
                className="mr-4 rounded-full"
              />
              <div>
                <p className="mb-2">
                  &quot;The mentors are fantastic and make coding fun and
                  accessible. My son looks forward to every session!&quot;
                </p>
                <p className="font-semibold">Sarah M.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

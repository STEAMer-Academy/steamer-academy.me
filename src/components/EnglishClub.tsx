import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EnglishClub() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>English Club - Our Services</title>
        <meta
          name="description"
          content="Join our English Club and improve your language skills"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="mb-8 text-3xl font-bold">Our services</h1>
        <h2 className="mb-12 text-4xl font-bold">English Club</h2>

        <section className="mb-12">
          <h3 className="mb-4 text-xl font-semibold">Introduction</h3>
          <h4 className="mb-2 text-lg font-medium">
            Calling all Word Wizards and Grammar Gurus!
          </h4>
          <p>
            Are you passionate about the English language? Do you dream of
            expressing yourself with confidence in English? Then look no
            further! Our English Club at STEAMer Academy is the perfect place
            for you.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="mb-4 text-xl font-semibold">Management</h3>
          <h4 className="mb-2 text-lg font-medium">
            Keeping it Fun and Functional: How We Manage the English Club
          </h4>
          <p>
            The English Club at STEAMer Academy is managed by a dedicated team
            of language enthusiasts and educators. We create an environment that
            fosters learning, creativity, and enjoyment. Leadership &
            Mentorship, Managing Events, Feedback & Improvement, and Resource
            Management are our key focus areas.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="mb-4 text-xl font-semibold">Target</h3>
          <h4 className="mb-2 text-lg font-medium">
            Goals of the English Club
          </h4>
          <ul className="list-inside list-disc">
            <li>
              To create a supportive and inclusive environment where members can
              develop their confidence and skills in using the English language.
            </li>
            <li>
              To provide opportunities for members to practice and improve their
              English language skills through various activities and events.
            </li>
            <li>
              To explore English language culture and literature, broadening
              members understanding and appreciation of the language.
            </li>
            <li>
              To foster a community of English language enthusiasts who can
              learn from and support each other.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h3 className="mb-4 text-xl font-semibold">Support</h3>
          <h4 className="mb-2 text-lg font-medium">
            Unleash Your Inner Wordsmith: How the English Club Supports You
          </h4>
          <p>
            At our English Club, we&apos;re committed to supporting your
            language learning journey every step of the way. We offer a range of
            resources to help you improve your English skills, including regular
            speaking practice sessions, writing workshops, and access to a
            variety of English language materials.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="mb-4 text-xl font-semibold">Our Partner</h3>
          <h4 className="mb-2 text-lg font-medium">
            Thanks to our Ass. Headmaster for supervision
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </section>

        <section className="mb-12">
          <h3 className="mb-4 text-xl font-semibold">Join Club</h3>
          <p className="mb-4">
            Welcome to a world of endless possibilities, where the journey to
            mastering the English language begins! By joining our English Club,
            you&apos;re not just becoming a member; you&apos;re becoming part of
            a vibrant community dedicated to the love of language and the
            pursuit of knowledge.
          </p>
          <div className="mb-4 flex items-center gap-4">
            <span className="font-bold">3 DAYS</span>
            <span className="font-bold">12 HOURS</span>
            <span className="font-bold">30 MINUTES</span>
            <span className="font-bold">22 SECONDS LEFT</span>
          </div>
          <div className="flex gap-2">
            <Button variant="default">Join Now</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </section>

        <section className="mb-12">
          <h3 className="mb-4 text-xl font-semibold">Deadline</h3>
          <p className="mb-4">
            You can also join us indirectly through Duolingo for School. This
            button will allow you to join our Duolingo Classroom.
          </p>
          <Button variant="default">Join Duolingo Classroom</Button>
        </section>

        <section className="mb-12">
          <h3 className="mb-8 text-xl font-semibold">Reviews</h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <p className="mb-4">
                  &quot;The English Club has been a game-changer for my language
                  skills! The supportive environment and engaging activities
                  have boosted my confidence in speaking and writing.&quot;
                </p>
                <div className="flex items-center">
                  <Image
                    src="/placeholder-avatar.png"
                    alt="Sarah J."
                    width={40}
                    height={40}
                    className="mr-4 rounded-full"
                  />
                  <span className="font-semibold">Sarah J.</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="mb-4">
                  &quot;I&apos;ve made great friends and improved my English at
                  the same time. The club&apos;s events are always fun and
                  educational. Highly recommend joining!&quot;
                </p>
                <div className="flex items-center">
                  <Image
                    src="/placeholder-avatar.png"
                    alt="Mike L."
                    width={40}
                    height={40}
                    className="mr-4 rounded-full"
                  />
                  <span className="font-semibold">Mike L.</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

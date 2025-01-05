"use client";

import Link from "next/link";
import {
  Location01Icon,
  Mail01Icon,
  Clock01Icon,
  CopyrightIcon,
  Facebook01Icon,
  // NewTwitterIcon,
  DiscordIcon,
  WhatsappIcon,
  Github01Icon,
} from "hugeicons-react";
import { NewsletterForm } from "@/components/wrapper";

export default function Footer() {
  return (
    <footer className="content-left border-t text-left">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="mb-4 text-lg font-bold">Our Socials</h3>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              Follow us on social media for the latest updates and offers. We
              are active on Facebook, Discord, WhatsApp, and GitHub.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/profile.php?id=61567677111933"
                className="text-gray-400 hover:text-blue-500"
                aria-label="Facebook Page Link"
              >
                <Facebook01Icon className="h-6 w-6" />
              </Link>
              {/* <Link href="#" className="text-gray-400 hover:text-gray-700"> */}
              {/*   <NewTwitterIcon className="h-6 w-6" /> */}
              {/* </Link> */}
              <Link
                href="https://discord.gg/Kqpbawj9KU"
                className="text-gray-400 hover:text-blue-600"
                aria-label="Discord Server Link"
              >
                <DiscordIcon className="h-6 w-6" />
              </Link>
              <Link
                href="https://whatsapp.com/channel/0029VaM5E3V1NCrcgLXjKN43"
                className="text-gray-400 hover:text-green-500"
                aria-label="WhatsApp Channel Link"
              >
                <WhatsappIcon className="h-6 w-6" />
              </Link>
              <Link
                href="https://github.com/STEAMer-Academy"
                className="text-gray-400 hover:text-gray-800"
                aria-label="GitHub Repository Link"
              >
                <Github01Icon className="h-6 w-6" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  prefetch={true}
                  className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  prefetch={true}
                  href="/services"
                  className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  prefetch={true}
                  href="/contact"
                  className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  prefetch={true}
                  href="/gallery"
                  className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  prefetch={true}
                  href="https://status.steameracademy.me"
                  className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Status
                </Link>
              </li>
              <li>
                <Link
                  prefetch={true}
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Location01Icon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail01Icon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  support@steameracademy.me
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock01Icon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Friday - Saturday, 8am - 8pm
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-bold">
              Subscribe to Our Newsletter
            </h3>
            <NewsletterForm />
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <CopyrightIcon className="mr-2 inline-block h-4 w-4" />
            <span>2025 STEAMer Academy. All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

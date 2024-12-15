"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook01Icon as Facebook,
  // NewTwitterIcon as Twitter,
  DiscordIcon as Discord,
  WhatsappIcon as Whatsapp,
  GithubIcon as Github,
  Mail01Icon as Mail,
  Location01Icon as MapPin,
  Clock01Icon as Clock,
} from "hugeicons-react";
import { NewsletterForm } from "../wrappers/headerAndFooter";

export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/assets/Favicon/favicon.png"
                alt="STEAMer Academy Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-xl font-bold">STEAMer Academy</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Empowering the next generation through innovative STEAM education.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link
                href="https://www.facebook.com/profile.php?id=61567677111933"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </Link>
              {/* <Link */}
              {/*   href="https://twitter.com" */}
              {/*   target="_blank" */}
              {/*   rel="noopener noreferrer" */}
              {/*   className="text-muted-foreground hover:text-primary" */}
              {/* > */}
              {/*   <Twitter size={20} /> */}
              {/* </Link> */}
              <Link
                href="https://discord.gg/Kqpbawj9KU"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600"
                aria-label="Discord"
              >
                <Discord size={20} />
              </Link>
              <Link
                href="https://whatsapp.com/channel/0029VaM5E3V1NCrcgLXjKN43"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500"
                aria-label="WhatsApp"
              >
                <Whatsapp size={20} />
              </Link>
              <Link
                href="https://github.com/STEAMer-Academy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-800"
                aria-label="GitHub"
              >
                <Github size={20} />
              </Link>
            </div>
            <div className="mt-4">
              <iframe
                src="https://status.steameracademy.me/badge?theme=dark"
                width="250"
                height="30"
                title="STEAMer Academy Status"
              ></iframe>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-muted-foreground hover:text-primary"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  support@steameracademy.me
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Friday - Saturday, 8am - 8pm
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Subscribe to our newsletter for updates and offers.
            </p>
            <NewsletterForm />
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} STEAMer Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

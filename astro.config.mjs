// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";
import partytown from "@astrojs/partytown";
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  site: "https://www.steameracademy.me/",

  integrations: [
    robotsTxt({
       sitemap: false,
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],

  output: "server",
  adapter: netlify(),
});

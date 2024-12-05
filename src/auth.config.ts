import { BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./lib/db";
import { twoFactor } from "better-auth/plugins";
import { passkey } from "better-auth/plugins";

export const config = {
  appName: "Steamer Academy",
  advanced: {
    cookiePrefix: "steamer-academy",
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 15 * 60,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    },
  },
  plugins: [
    twoFactor(),
    passkey({
      rpName: "Steamer Academy",
      rpID: "www.steameracademy.me",
      origin:
        process.env.NODE_ENV === "production"
          ? "https://www.steameracademy.me"
          : "http://localhost:3000",
    }),
  ],
} satisfies BetterAuthOptions;

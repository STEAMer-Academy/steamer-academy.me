import { schema } from "../db/schema";
import { env } from "hono/adapter";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins/two-factor";
import { passkey } from "better-auth/plugins/passkey";
import { Context } from "hono";
import { getDb } from "../db/db";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export function getAuth(c: Context) {
  if (!authInstance) {
    const db = getDb(c);

    authInstance = betterAuth({
      appName: "Steamer Academy",
      baseURL: "https://api.steameracademy.me",
      trustedOrigins: [
        "https://www.steameracademy.me",
        "http://localhost:3000",
      ],
      advanced: {
        cookiePrefix: "steamer-academy",
        crossSubDomainCookies: {
          enabled: true,
        },
      },
      session: {
        cookieCache: {
          enabled: true,
          maxAge: 15 * 60,
        },
      },
      database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
          ...schema,
        },
      }),
      emailAndPassword: {
        enabled: true,
      },
      socialProviders: {
        github: {
          clientId: env<{ GITHUB_ID: string }>(c).GITHUB_ID,
          clientSecret: env<{ GITHUB_SECRET: string }>(c).GITHUB_SECRET,
        },
        google: {
          clientId: env<{ GOOGLE_ID: string }>(c).GOOGLE_ID,
          clientSecret: env<{ GOOGLE_SECRET: string }>(c).GOOGLE_SECRET,
        },
      },
      plugins: [
        twoFactor(),
        passkey({
          rpName: "Steamer Academy",
          rpID: "www.steameracademy.me",
          origin: "https://www.steameracademy.me",
        }),
      ],
    });
  }

  return authInstance;
}

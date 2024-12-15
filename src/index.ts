import { Hono } from "hono";
import newsletter from "./routes/newsletter";
import contact from "./routes/contact";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "hono/adapter";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { twoFactor } from "better-auth/plugins/two-factor";
import { passkey } from "better-auth/plugins/passkey";
import { cors } from "hono/cors";

const app = new Hono();

app.post("/newsletter", newsletter);
app.post("/contact", contact);

app.use("/auth/**", async (c) => {
  const pool = new Pool({
    connectionString: env<{ DATABASE_URL: string }>(c).DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 3,
  });

  const db = drizzle(pool);

  const auth = betterAuth({
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

  try {
    return await auth.handler(c.req.raw);
  } finally {
    await pool.end();
  }
});

app.use(
  "*",
  cors({
    origin: ["https://www.steameracademy.me", "http://localhost:3000"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

export default app;

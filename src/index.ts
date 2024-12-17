import { Hono } from "hono";
import newsletter from "./routes/newsletter";
import contact from "./routes/contact";
import { cors } from "hono/cors";
import blogsRoute from "./routes/blogs";
import { getAuth } from "./routes/auth";
import teammembers from "./routes/discord-team-members";
import { env } from "hono/adapter";
import { Context } from "hono";

const app = new Hono<{
  Variables: {
    user: ReturnType<typeof getAuth>["$Infer"]["Session"]["user"] | null;
    session: ReturnType<typeof getAuth>["$Infer"]["Session"]["session"] | null;
  };
}>();

// CORS middleware
app.use(
  "*",
  cors({
    origin: ["https://www.steameracademy.me", "http://localhost:3000"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "X-Datadog-Origin",
      "X-Datadog-Trace-Id",
      "X-Datadog-Parent-Id",
      "X-Datadog-Sampling-Priority",
      "Traceparent",
    ],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// Middleware To Restrict Access
app.use("*", async (c: Context, next) => {
  // Define unrestricted routes
  const unrestrictedPaths = ["/api/auth", "/session"];

  // Check if the request path matches any unrestricted route
  const isUnrestricted = unrestrictedPaths.some((path) =>
    c.req.path.startsWith(path),
  );

  if (isUnrestricted) {
    return await next(); // Skip the restriction for these routes
  }

  // Authorization logic for restricted routes
  const ACCESS_KEY = env<{ ACCESS_KEY: string }>(c).ACCESS_KEY;
  const authHeader = c.req.header("Authorization");
  if (authHeader !== `Bearer ${ACCESS_KEY}`) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  await next();
});

// Middleware to set `user` and `session`
app.use("*", async (c, next) => {
  const auth = getAuth(c);
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

// Route Definitions
app.post("/newsletter", newsletter);
app.post("/contact", contact);
app.get("/blogs", blogsRoute);
app.get("/team-members", teammembers);

// Auth-specific routes
app.on(["POST", "GET"], "/api/auth/**", (c) => {
  const auth = getAuth(c);
  return auth.handler(c.req.raw);
});

// Session check route
app.get("/session", async (c) => {
  const allowedOrigins = new Set([
    "https://www.steameracademy.me",
    "http://localhost:3000",
  ]);

  const origin = c.req.header("Origin");

  if (origin && allowedOrigins.has(origin)) {
    c.header("Access-Control-Allow-Origin", origin);
  }

  c.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type");
  c.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight request
  if (c.req.method === "OPTIONS") {
    return c.text("", 204);
  }

  const session = c.get("session");
  const user = c.get("user");

  if (!user) return c.body(null, 401);

  return c.json({
    session,
    user,
  });
});

export default app;

import { Hono } from "hono";
import newsletter from "./routes/newsletter";
import contact from "./routes/contact";
import { cors } from "hono/cors";
import blogsRoute from "./routes/blogs";
import teammembers from "./routes/discord-team-members";
import { env } from "hono/adapter";
import { Context } from "hono";

const app = new Hono();

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

app.use("*", async (c: Context, next) => {
  const ACCESS_KEY = env<{ ACCESS_KEY: string }>(c).ACCESS_KEY;
  const authHeader = c.req.header("Authorization");
  if (authHeader !== `Bearer ${ACCESS_KEY}`) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  await next();
});


app.post("/newsletter", newsletter);
app.post("/contact", contact);
app.get("/blogs", blogsRoute);
app.get("/team-members", teammembers);

export default app;

import { Meilisearch } from "meilisearch";
import { Context } from "hono";
import { env } from "hono/adapter";

const search = async (c: Context) => {
  const allowedOrigins = new Set([
    "https://www.steameracademy.me",
    "http://localhost:3000",
  ]);

  const origin = c.req.header("Origin");

  if (origin && allowedOrigins.has(origin)) {
    c.header("Access-Control-Allow-Origin", origin);
  }

  c.header("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  c.header("Access-Control-Allow-Headers", "Content-Type");
  c.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight request
  if (c.req.method === "OPTIONS") {
    return c.text("", 204);
  }

  const client = new Meilisearch({
    host: env<{ MEILISEARCH_HOST_URL: string }>(c).MEILISEARCH_HOST_URL,
    apiKey: env<{ MEILISEARCH_API_KEY: string }>(c).MEILISEARCH_API_KEY,
  });

  const index = client.index("steameracademy");
  const query = c.req.query("q");

  if (!query) {
    return c.json({ results: [] }, 400);
  }

  try {
    const results = await index.search(query, { limit: 10 });
    return c.json({ results: results.hits });
  } catch (error) {
    console.error("Error performing search:", error);
    return c.json({ error: "An error occurred while searching" }, 500);
  }
};

export default search;

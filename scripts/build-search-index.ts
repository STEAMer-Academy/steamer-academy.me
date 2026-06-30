/**
 * Builds a pre-computed search index for client-side full-text search.
 *
 * Reads public/searchData.json, creates a MiniSearch index,
 * and writes the serialized index to public/searchIndex.json.
 *
 * Usage:
 *   bun run scripts/build-search-index.ts
 *
 * Called before next build via the "build" script in package.json.
 */

import { readFileSync, writeFileSync } from "fs";
import MiniSearch from "minisearch";

interface SearchItem {
  id: string;
  title: string;
  content: string;
  url: string;
}

const data: SearchItem[] = JSON.parse(
  readFileSync("public/searchData.json", "utf-8"),
);

const miniSearch = new MiniSearch({
  fields: ["title", "content"],
  storeFields: ["id", "title", "content", "url"],
  idField: "url",
  searchOptions: {
    boost: { title: 2 },
    fuzzy: 0.2,
    prefix: true,
  },
});

miniSearch.addAll(data);

const serialized = JSON.stringify(miniSearch);
writeFileSync("public/searchIndex.json", serialized);

const count = Object.keys(data).length;
const sizeKb = (serialized.length / 1024).toFixed(1);
console.log(`✅ Search index built: ${count} items, ${sizeKb}KB`);

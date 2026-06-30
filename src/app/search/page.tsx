import { Suspense } from "react";
import fs from "fs";
import path from "path";
import SearchContent from "./SearchContent";

// ── Server component wrapper ───────────────────────────────────────
// Pre-fetches search index from public/ to avoid client-side fetch waterfall.
// Falls back to client fetch if the file is unavailable at request time.

export default async function SearchPage() {
  let initialSearchData: string | null = null;
  try {
    const filePath = path.join(process.cwd(), "public", "searchIndex.json");
    initialSearchData = fs.readFileSync(filePath, "utf-8");
  } catch {
    // File not available (e.g. first build), client will fetch it
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent initialSearchData={initialSearchData} />
    </Suspense>
  );
}

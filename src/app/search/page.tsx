"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Layout from "@/components/Layout";

interface SearchItem {
  id: string;
  title: string;
  content: string;
  url: string;
}

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    async function performSearch() {
      setIsLoading(true);
      try {
        const response = await fetch("/searchData.json");
        const data: SearchItem[] = await response.json();
        const results = data.filter(
          (item) =>
            item.title.toLowerCase().includes(query?.toLowerCase() || "") ||
            item.content.toLowerCase().includes(query?.toLowerCase() || ""),
        );
        setSearchResults(results);
      } catch (error) {
        console.error("Error fetching search data:", error);
        setSearchResults([]);
      }
      setIsLoading(false);
    }

    performSearch();
  }, [query]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">
          Search Results for &quot;{query}&quot;
        </h1>
        {searchResults.length > 0 ? (
          <ul className="space-y-4">
            {searchResults.map((result) => (
              <li key={result.id} className="border-b border-gray-200 pb-4">
                <Link
                  href={result.url}
                  className="block rounded p-4 hover:bg-gray-100"
                >
                  <h2 className="mb-2 text-xl font-semibold">{result.title}</h2>
                  <p className="text-gray-600">{result.content}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </Layout>
  );
}

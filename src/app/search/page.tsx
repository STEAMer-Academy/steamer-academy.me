"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Layout,
  Button,
  Input,
  Pagination,
  Skeleton,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/wrapper";
import Fuse from "fuse.js";
import {
  Search01Icon,
  Home07Icon,
  InformationCircleIcon,
  Image01Icon,
  File01Icon,
  CallIcon,
  LanguageSkillIcon,
  CodeIcon,
} from "hugeicons-react";

interface SearchItem {
  id: string;
  title: string;
  content: string;
  url: string;
}

const ITEMS_PER_PAGE = 10;

const getIconForUrl = (url: string) => {
  if (url.includes("/blogs")) return File01Icon;
  if (url.includes("/gallery")) return Image01Icon;
  if (url.includes("/contact")) return CallIcon;
  if (url.includes("/about")) return InformationCircleIcon;
  if (url.includes("/services/code-club")) return CodeIcon;
  if (url.includes("/services/english-club")) return LanguageSkillIcon;
  return Home07Icon;
};

export default function SearchPage() {
  const [searchData, setSearchData] = useState<SearchItem[]>([]);
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const fuse = useMemo(() => {
    return new Fuse(searchData, {
      keys: ["title", "content"],
      threshold: 0.3,
    });
  }, [searchData]);

  useEffect(() => {
    async function fetchSearchData() {
      try {
        const response = await fetch("/searchData.json");
        const data: SearchItem[] = await response.json();
        setSearchData(data);
      } catch (error) {
        console.error("Error fetching search data:", error);
      }
    }

    fetchSearchData();
  }, []);

  useEffect(() => {
    function performSearch() {
      setIsLoading(true);
      if (query.length > 0) {
        const results = fuse.search(query).map((result) => result.item);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
      setCurrentPage(1);
      setIsLoading(false);
    }

    if (searchData.length > 0) {
      performSearch();
    }
  }, [query, searchData, fuse]);

  const pageCount = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">
          Search Results for &quot;{query}&quot;
        </h1>
        <div className="mb-8">
          <form className="flex gap-2" action="/search">
            <div className="relative grow">
              <Search01Icon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                type="search"
                name="q"
                placeholder="Search..."
                defaultValue={query}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : searchResults.length > 0 ? (
          <>
            <div className="mb-8 space-y-4">
              {paginatedResults.map((result) => {
                const IconComponent = getIconForUrl(result.url);
                return (
                  <Card key={result.id}>
                    <CardHeader>
                      <CardTitle>
                        <Link
                          href={result.url}
                          prefetch={true}
                          className="flex items-center gap-2 hover:underline"
                        >
                          <IconComponent className="h-5 w-5" />
                          {result.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{result.content}</CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            {pageCount > 1 && (
              <Pagination
                // @ts-expect-error - Component prop type mismatch
                currentPage={currentPage}
                totalPages={pageCount}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </Layout>
  );
}

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { fetchSearchResults, fetchTopQuestions } from "./api/api";
import { Loader2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { getMetadataValues } from "./utils";

export const Search = () => {
  const [query, setQuery] = useState("");

  const { data: topQuestions = [] } = useQuery({
    queryKey: ["topQuestions"],
    queryFn: fetchTopQuestions,
  });

  const {
    data: results = [],
    isPending: isLoadingResults,
    mutate: handleFetchResults,
  } = useMutation({
    mutationKey: ["search"],
    mutationFn: fetchSearchResults,
  });

  const handleSearch = async (searchQuery: string = query) => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      handleFetchResults(trimmedQuery);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Search API - Search Results Customization Example
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              className="flex-grow"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Search..."
            />
            <Button
              onClick={() => handleSearch()}
              disabled={query.trim().length === 0}
            >
              Search
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {topQuestions.length > 0 ? (
                  topQuestions.map((question, index) => (
                    <li
                      key={index}
                      className="cursor-pointer hover:text-blue-500 transition-colors"
                      onClick={() => {
                        setQuery(question.question);
                        handleSearch(question.question);
                      }}
                    >
                      {question.question}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-600">No suggestions available</p>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between">
                <span>Search Results</span>
                {isLoadingResults && (
                  <Loader2 className="h-6 w-6 animate-spin" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.length > 0 ? (
                <ul className="space-y-4">
                  {results.map((result, index) => {
                    const { description, image } = getMetadataValues(result);
                    return (
                      <li
                        key={index}
                        className="border-b pb-4 last:border-b-0 flex gap-4"
                      >
                        {image && (
                          <div className="h-20 aspect-video overflow-hidden rounded-sm">
                            <img
                              src={image}
                              alt={result.title}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}

                        <div className="w-full">
                          <a
                            href={result.url}
                            className="text-blue-500 hover:underline font-semibold"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {result.title}
                          </a>
                          {description && (
                            <p className="text-gray-600 mt-1">{description}</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-500">
                  No search results available for this query
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

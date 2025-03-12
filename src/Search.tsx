import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import {
  fetchSearchResults,
  fetchSuggestions,
  fetchSummary,
  fetchTopQuestions,
} from "./api/api";
import { Loader2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [userInput, setUserInput] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  const { data: topQuestions = [] } = useQuery({
    queryKey: ["topQuestions"],
    queryFn: fetchTopQuestions,
  });

  const { data: suggestions = [], mutate: handleFetchSuggestions } =
    useMutation({
      mutationKey: ["suggestions", debouncedQuery],
      mutationFn: fetchSuggestions,
    });

  const {
    data: results = [],
    isPending: isLoadingResults,
    mutate: handleFetchResults,
  } = useMutation({
    mutationKey: ["search"],
    mutationFn: fetchSearchResults,
  });

  const {
    data: summary,
    isPending: isLoadingSummary,
    mutate: handleFetchSummary,
  } = useMutation({
    mutationKey: ["summary"],
    mutationFn: fetchSummary,
  });

  const handleSearch = async (searchQuery: string = query) => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      handleFetchSummary(trimmedQuery);
      handleFetchResults(trimmedQuery);
    }
  };

  useEffect(() => {
    if (debouncedQuery.length >= 3 && userInput) {
      handleFetchSuggestions(debouncedQuery);
    }
  }, [debouncedQuery, handleFetchSuggestions, userInput]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Search API - React Example
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
                setUserInput(true);
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
              <CardTitle>
                {suggestions.length > 0 ? "Suggestions" : "Top Questions"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {suggestions.length > 0 ? (
                  suggestions.map(({ suggestion }, index) => (
                    <li
                      key={index}
                      className="cursor-pointer hover:text-blue-500 transition-colors"
                      onClick={() => {
                        setUserInput(false);
                        setQuery(suggestion);
                        handleSearch(suggestion);
                      }}
                    >
                      {suggestion}
                    </li>
                  ))
                ) : topQuestions.length > 0 ? (
                  topQuestions.map((question, index) => (
                    <li
                      key={index}
                      className="cursor-pointer hover:text-blue-500 transition-colors"
                      onClick={() => {
                        setUserInput(false);
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
                <span>Summary</span>
                {isLoadingSummary && (
                  <Loader2 className="h-6 w-6 animate-spin" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {summary?.status === "success" ? (
                <>
                  <div
                    className="[&>ol]:pl-6 [&>ol]:list-decimal [&>ul]:pl-6 [&>ul]:list-disc [&>p>a]:text-blue-500 [&>p>a]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: summary.summary }}
                  />

                  {summary.references.length > 0 && (
                    <>
                      <h3 className="font-semibold mt-4 mb-2">References</h3>
                      <ol className="list-decimal pl-5 space-y-1">
                        {summary.references.map((ref, index) => (
                          <li key={index}>
                            <a
                              href={ref.url}
                              className="text-blue-500 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {ref.title}
                            </a>
                          </li>
                        ))}
                      </ol>
                    </>
                  )}
                </>
              ) : (
                <p className="text-gray-500">
                  No summary available for this query
                </p>
              )}
            </CardContent>
          </Card>

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
                  {results.map((result, index) => (
                    <li key={index} className="border-b pb-4 last:border-b-0">
                      <a
                        href={result.url}
                        className="text-blue-500 hover:underline font-semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {result.title}
                      </a>
                      <p
                        className="text-gray-600 mt-1"
                        dangerouslySetInnerHTML={{ __html: result.content }}
                      />
                    </li>
                  ))}
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

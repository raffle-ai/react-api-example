export type Question = {
  question: string;
};

export type TopQuestionsResponse = {
  questions: Array<Question>;
};

export type Suggestion = {
  suggestion: string;
};

export type SuggestionsResponse = {
  suggestions: Array<Suggestion>;
};

export type Reference = {
  index: number;
  title: string;
  url: string;
  content: string;
};

export type SummaryResponse = {
  status: "success" | "no-relevant-results";
  summary: string;
  references: Array<Reference>;
};

export type SearchResult = {
  configuration: null | Record<string, unknown>;
  content: string;
  feedback_data: string;
  metadata: Array<{
    matches: Array<{
      tag: string;
      attr: Record<string, string>;
      type: string;
    }>;
    selector: string;
  }>;
  preview_url: string | null;
  title: string;
  type: string;
  url: string;
};

export type SearchResultsResponse = {
  results: Array<SearchResult>;
};

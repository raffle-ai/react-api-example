export type Question = {
  question: string;
};

export type TopQuestionsResponse = {
  questions: Array<Question>;
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

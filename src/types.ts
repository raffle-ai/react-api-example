export type Question = {
  question: string;
};

export type TopQuestionsResponse = {
  questions: Array<Question>;
};

export type HTMLNode = {
  tag?: string;
  type: "tag" | "text";
  attr?: Record<string, string>;
  data?: string;
  children?: HTMLNode[];
};

export type SearchResult = {
  configuration: null | Record<string, unknown>;
  content: string;
  feedback_data: string;
  metadata: Array<{
    matches: HTMLNode[];
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

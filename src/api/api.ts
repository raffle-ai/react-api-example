import {
  SearchResultsResponse,
  SuggestionsResponse,
  SummaryResponse,
  TopQuestionsResponse,
} from "../types";
import { routes } from "./routes";
import { urlBuilder } from "./utils";

const uid = import.meta.env.VITE_RAFFLE_UI_UID;
const sessionId = "my-session-id";

export const fetchTopQuestions = async () => {
  const url = urlBuilder(routes.topQuestionsURL, { uid });
  const response = await fetch(url);
  const data = (await response.json()) as TopQuestionsResponse;
  return data.questions;
};

export const fetchSuggestions = async (query: string) => {
  const url = urlBuilder(routes.suggestionsURL, {
    uid,
    query,
    limit: "5",
  });
  const response = await fetch(url);
  const data = (await response.json()) as SuggestionsResponse;
  return data.suggestions;
};

export const fetchSearchResults = async (query: string) => {
  const url = urlBuilder(routes.searchURL, {
    uid,
    query,
    preview: "true",
    device: "desktop",
    "session-id": sessionId,
  });
  const response = await fetch(url);
  const data = (await response.json()) as SearchResultsResponse;
  return data.results;
};

export const fetchSummary = async (query: string) => {
  const url = urlBuilder(routes.summaryURL, { uid, query });
  const response = await fetch(url);
  const data = await response.json();
  return data as SummaryResponse;
};

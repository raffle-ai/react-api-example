import { SearchResultsResponse, TopQuestionsResponse } from "../types";
import { routes } from "./routes";
import { urlBuilder } from "./utils";

const uid = import.meta.env.VITE_RAFFLE_UI_UID;
const sessionId = "my-session-id"; // Replace this with the current session id

// Ensure the environment variable is set
if (!uid) {
  throw new Error(
    "Environment variable VITE_RAFFLE_UI_UID is not set. Please set it in your .env file to use the Raffle API."
  );
}

export const fetchTopQuestions = async () => {
  const url = urlBuilder(routes.topQuestionsURL, { uid });
  const response = await fetch(url);
  const data = (await response.json()) as TopQuestionsResponse;
  return data.questions;
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

import { SearchResult } from "./types";

export const getMetadataValues = (data: SearchResult) => {
  const descriptionMetadata = data.metadata.find(
    (meta) => meta.selector === "description"
  );

  const imageMetadata = data.metadata.find((meta) => meta.selector === "image");

  const description =
    descriptionMetadata?.matches.find(
      (match) => match.attr?.name === "description"
    )?.attr?.content || null;
  const image =
    imageMetadata?.matches.find((match) => match.attr?.property === "og:image")
      ?.attr?.content || null;

  return { description, image };
};

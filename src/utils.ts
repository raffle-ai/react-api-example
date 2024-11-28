import { SearchResult } from "./types";

export const getMetadataValues = (data: SearchResult) => {
  const descriptionMetadata = data.metadata.find(
    (meta) => meta.selector === "description"
  );

  const imageMetadata = data.metadata.find((meta) => meta.selector === "image");

  const description = descriptionMetadata?.matches[0].attr?.content || null;
  const image = imageMetadata?.matches[0].attr?.content || null;

  return { description, image };
};

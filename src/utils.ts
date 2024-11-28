import { SearchResult } from "./types";

const metadataMap = {
  description: {
    attribute: "name",
    value: "description",
  },
  image: {
    attribute: "property",
    value: "og:image",
  },
};

// This helper retrieves all metadata using a metadataMap
export const getMetadataValuesFromAttributes = (data: SearchResult) =>
  Object.entries(metadataMap).reduce(
    (acc, [label, value]) => {
      return {
        ...acc,
        [label]: data.metadata
          .find((meta) => meta.selector === label)
          ?.matches.find(
            (match) => match.attr?.[value.attribute] === value.value
          )?.attr?.content,
      };
    },
    {} as {
      [K in keyof typeof metadataMap]?: string;
    }
  );

// This helper retrieves each metadata individually
export const getMetadataValues = (data: SearchResult) => {
  const descriptionMetadata = data.metadata.find(
    (meta) => meta.selector === "description"
  );

  const imageMetadata = data.metadata.find((meta) => meta.selector === "image");

  const description = descriptionMetadata?.matches.find(
    (match) => match.attr?.name === "description"
  )?.attr?.content;

  const image = imageMetadata?.matches.find(
    (match) => match.attr?.property === "og:image"
  )?.attr?.content;

  return { description, image };
};

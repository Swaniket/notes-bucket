import React from "react";
import TagCard from "../TagCard";
import SearchTags from "../SearchTags";

function TagList({ tags }) {
  return (
    <>
      {tags?.map(({ tagId, tagName }) => (
        <TagCard key={tagId} id={tagId} name={tagName} />
      ))}
    </>
  );
}

export default SearchTags(TagList);

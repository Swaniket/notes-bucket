import React from "react";
import TagCard from "../TagCard";
import SearchTags from "../SearchTags";
import NoData from "../../common/NoData";
import noTags from "../../../assets/no_tags.svg";

function TagList({ tags }) {
  let noTagIndicator = false;

  if (tags?.length === 0) noTagIndicator = true;

  if (noTagIndicator) {
    return (
      <NoData svgImage={noTags} helperText="Tags that you add appear here" />
    );
  }

  return (
    <>
      {tags?.map(({ tagId, tagName }) => (
        <TagCard key={tagId} id={tagId} name={tagName} />
      ))}
    </>
  );
}

export default SearchTags(TagList);

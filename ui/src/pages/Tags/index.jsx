import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags, getTagsState } from "../../redux/slice/tagsSlice";
import { TagCard } from "../../components";

function Tags() {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(getTagsState);
  const { tags } = useSelector(getTagsState);
  console.log("tags", tags);

  useEffect(() => {
    dispatch(getTags());
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {tags?.map(({ tagId, tagName }) => (
        <TagCard key={tagId} id={tagId} name={tagName} />
      ))}
    </div>
  );
}

export default Tags;

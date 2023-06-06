import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTags, getTagsState } from "../../redux/slice/tagsSlice";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
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
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 className="note-section" style={{ margin: "10px" }}>
          TAGS
        </h2>
        {tags?.map(({ tagId, tagName }) => (
          <TagCard key={tagId} id={tagId} name={tagName} />
        ))}
        {/* Create New Note Button */}
        <span className="floating-button">
          <Button className="btn btn-dark create">
            <FaPlus size={35} />
          </Button>
        </span>
      </div>
    </>
  );
}

export default Tags;

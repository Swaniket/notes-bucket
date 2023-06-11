import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTags, getTagsState } from "../../../redux/slice/tagsSlice";
import {
  filterNotesByTag,
  resetFilterByTag,
} from "../../../redux/slice/notesSlice";
import { MdClear } from "react-icons/md";
import { TbTag } from "react-icons/tb";
import "./index.css";

function TagBar() {
  const dispatch = useDispatch();

  const [showClearButton, setShowClearButton] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");

  const { tags } = useSelector(getTagsState);

  useEffect(() => {
    dispatch(getTags());
  }, []);

  const handleTagClick = (tag) => {
    dispatch(filterNotesByTag(tag?.tagId));
    setShowClearButton(true);
    setSelectedTag(tag?.tagId);
  };

  const handleClearClick = () => {
    dispatch(resetFilterByTag());
    setShowClearButton(false);
    setSelectedTag("");
  };

  return (
    <>
      {tags ? (
        <span className="tag-bar">
          <span>
            {tags.map((tag) => (
              <Badge
                pill
                bg={tag?.tagId === selectedTag ? "dark" : "light"}
                className="tag-pill"
                key={tag?.tagId}
                onClick={() => handleTagClick(tag)}
              >
                <TbTag style={{ marginRight: "3px" }} />{" "}
                <strong>{tag?.tagName}</strong>
              </Badge>
            ))}
          </span>
          {showClearButton ? (
            <Badge
              bg="danger"
              onClick={handleClearClick}
              className="clear-button"
            >
              <MdClear />
            </Badge>
          ) : null}
        </span>
      ) : null}
    </>
  );
}

export default TagBar;

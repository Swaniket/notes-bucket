import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InputGroup, Button, Form } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { filterNotes, resetNotesFilter } from "../../../redux/slice/notesSlice";
import { filterTags, resetTagsFilter } from "../../../redux/slice/tagsSlice";
import "./index.css";

function DynamicSearchBar({ type = null }) {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");

  const searchNotes = () => {
    if (type === "notes") dispatch(filterNotes(searchKey));
    else if (type === "tags") dispatch(filterTags(searchKey));
  };

  const clearSearch = () => {
    setSearchKey("");
    if (type === "notes") dispatch(resetNotesFilter());
    else if (type === "tags") dispatch(resetTagsFilter());
  };

  return (
    <InputGroup className="search-bar">
      <Form.Control
        placeholder="Search"
        size="sm"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <Button className="btn btn-dark" onClick={clearSearch}>
        <AiOutlineClose />
      </Button>

      <Button className="btn btn-dark" onClick={searchNotes}>
        <FaSearch /> Search
      </Button>
    </InputGroup>
  );
}

export default DynamicSearchBar;

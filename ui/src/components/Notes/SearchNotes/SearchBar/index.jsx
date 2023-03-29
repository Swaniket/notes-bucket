import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InputGroup, Button, Form } from "react-bootstrap";
import { AiOutlineClose } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import { filterNotes, resetFilter } from "../../../../redux/slice/notesSlice";
import "./index.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");

  const searchNotes = () => {
    dispatch(filterNotes(searchKey));
  };

  const clearSearch = () => {
    setSearchKey("");
    dispatch(resetFilter());
  };

  return (
    <InputGroup className="search-bar">
      <Form.Control
        placeholder="Search Notes"
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

export default SearchBar;

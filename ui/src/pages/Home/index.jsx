import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { createNote } from "../../redux/slice/notesSlice";
import { NoteList, SearchBar } from "../../components";
import "./index.css";

function Home() {
  const navigate = useNavigate();

  const createNewNote = () => {
    navigate("/create");
    // Open Create Note page
    // dispatch()
  };

  return (
    <div className="home-body">
      <span className="mb-3 control-bar-container">
        {/* <SearchBar /> */}
        <Button className="btn btn-dark create" onClick={createNewNote}>
          <FaPlus /> Create new Note
        </Button>
      </span>
      <NoteList />
    </div>
  );
}

export default Home;

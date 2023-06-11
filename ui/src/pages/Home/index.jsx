import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import {
  NoteList,
  DynamicContentModal,
  CreateNote,
  TagBar,
} from "../../components";
import "./index.css";

function Home() {
  const [openCreateNoteModal, setOpenCreateNoteModal] = useState(false);

  const createNewNote = () => {
    setOpenCreateNoteModal(true);
  };

  const closeCreateNote = () => {
    setOpenCreateNoteModal(false);
  };

  return (
    <div className="home-body">
      <TagBar />

      {/* The List of the Notes */}
      <NoteList />
      {/* Create New Note Button */}
      <span className="floating-button">
        <Button className="btn btn-dark create" onClick={createNewNote}>
          <FaPlus size={35} />
        </Button>
      </span>
      <DynamicContentModal
        show={openCreateNoteModal}
        handleClose={closeCreateNote}
        title="Create new note"
        children={<CreateNote closeModal={closeCreateNote} />}
      />
    </div>
  );
}

export default Home;

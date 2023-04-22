import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { NoteList, DynamicContentModal, CreateNote } from "../../components";
// import CreateNote from "../../components/Notes/CreateNote";
import "./index.css";

function Home() {
  const navigate = useNavigate();

  const [openCreateNoteModal, setOpenCreateNoteModal] = useState(false);

  const createNewNote = () => {
    setOpenCreateNoteModal(true);
  };

  const closeCreateNote = () => {
    setOpenCreateNoteModal(false);
  };

  return (
    <div className="home-body">
      {/* <HomeHeader /> */}
      <span className="mb-3 control-bar-container">
        <Button className="btn btn-dark create" onClick={createNewNote}>
          <FaPlus /> Create new Note
        </Button>
      </span>
      <NoteList />
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

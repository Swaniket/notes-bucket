import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { CreateTag, DynamicContentModal, TagList } from "../../components";
import "./index.css";

function Tags() {
  const [openAddTagModal, setOpenAddTagModal] = useState(false);

  return (
    <>
      <div className="tags-page-container">
        <h2 className="note-section" style={{ margin: "10px" }}>
          TAGS
        </h2>
        <TagList />
        {/* Create New Note Button */}
        <span className="floating-button">
          <Button
            className="btn btn-dark create"
            onClick={() => setOpenAddTagModal(true)}
          >
            <FaPlus size={35} />
          </Button>
        </span>
      </div>
      <DynamicContentModal
        show={openAddTagModal}
        handleClose={() => setOpenAddTagModal(false)}
        title="Add a new Tag"
        children={<CreateTag closeModal={() => setOpenAddTagModal(false)} />}
      />
    </>
  );
}

export default Tags;

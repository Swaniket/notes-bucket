import React, { useState, useEffect } from "react";
import { Card, Badge } from "react-bootstrap";
import { FaEye, FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { formattedDate } from "../../../utils/formatDate";
import DynamicModal from "../../Modals/DynamicModal";
import { DynamicContentModal } from "../..";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteNote,
  getNotes,
  getNotesState,
} from "../../../redux/slice/notesSlice";
import { toast } from "react-toastify";
import EditNote from "../EditNote";

function Note({ noteId, title, body, createdAt, updatedAt, tagName }) {
  const dispatch = useDispatch();

  const { deleteNoteError, deleteNoteSuccess } = useSelector(getNotesState);

  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);

  const onDeleteNote = () => {
    dispatch(deleteNote(noteId));
  };

  useEffect(() => {
    if (deleteNoteError) {
      toast.error("Note could not be deleted", {
        toastId: "failed-delete-note-toast",
      });
    }

    if (deleteNoteSuccess) {
      setOpenDeleteConfirmationModal(false);
      dispatch(getNotes());
      toast.success("Note deleted successfully", {
        toastId: "success-delete-note-toast",
      });
    }
  }, [deleteNoteError, deleteNoteSuccess]);

  return (
    <>
      <Card className="note-card">
        <Card.Body>
          <Card.Title className="custom-title mb-0">
            <h6>
              <span className="limited-text">{title}</span>
            </h6>
            <h6>
              <Badge pill bg="dark">
                <small>{tagName}</small>
              </Badge>
            </h6>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <small> Created: {formattedDate(createdAt)}</small>
          </Card.Subtitle>
          <p></p>
          <Badge
            bg="light"
            text="dark"
            className="badge-button"
            onClick={() => setOpenViewModal(true)}
          >
            <FaEye /> View
          </Badge>
          <Badge
            bg="dark"
            className="badge-button"
            onClick={() => setOpenEditModal(true)}
          >
            <FaPenAlt /> Edit
          </Badge>

          <Badge
            bg="light"
            className="badge-button delete"
            onClick={() => setOpenDeleteConfirmationModal(true)}
          >
            <FaTrashAlt color="brown" />
          </Badge>
        </Card.Body>
      </Card>
      <DynamicModal
        show={openViewModal}
        handleClose={() => setOpenViewModal(false)}
        primaryButtonAction={() => setOpenViewModal(false)}
        primaryButtonText="Close"
        title={title}
        bodyMessage={body}
        isRenderedMarkdown={true}
        renderSecondaryButton={false}
        fullScreen={true}
      />
      <DynamicModal
        show={openDeleteConfirmationModal}
        handleClose={() => setOpenDeleteConfirmationModal(false)}
        primaryButtonAction={onDeleteNote}
        primaryButtonText="Delete"
        title="Caution!"
        bodyMessage="Are you sure you want to delete this note? this action is irreversible."
        secondaryButtonText="Cancel"
      />

      <DynamicContentModal
        show={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        title="Edit Note"
        children={<EditNote title={title} body={body} tagName={tagName} />}
      />
    </>
  );
}

export default Note;

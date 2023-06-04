import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Badge } from "react-bootstrap";
import { FaEye, FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { TbPinned, TbPinnedFilled } from "react-icons/tb";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import { formattedDate } from "../../../utils/formatDate";
import DynamicModal from "../../Modals/DynamicModal";
import { DynamicContentModal } from "../..";
import {
  deleteNote,
  editNote,
  getNotes,
  getNotesState,
  resetEditNotesState,
  resetDeleteNoteState,
} from "../../../redux/slice/notesSlice";
import { toast } from "react-toastify";
import EditNote from "../EditNote";
import "./index.css";

function Note({
  noteId,
  title,
  body,
  createdAt,
  updatedAt,
  tagName,
  tagId,
  isPinned,
  isArchived,
}) {
  const dispatch = useDispatch();

  const {
    deleteNoteError,
    deleteNoteSuccess,
    editNoteSuccess,
    editNoteError,
    editNoteMessage,
  } = useSelector(getNotesState);

  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);

  const onDeleteNote = () => {
    dispatch(deleteNote(noteId));
  };

  const onPinnedClick = () => {
    let editedNote = {};
    if (isPinned === true) {
      editedNote = {
        noteId: noteId,
        isPinned: "false",
      };
    } else {
      editedNote = {
        noteId: noteId,
        isPinned: "true",
      };
    }

    dispatch(editNote(editedNote));
  };

  const onArchiveClick = () => {
    let editedNote = {};

    if (isArchived === true) {
      editedNote = {
        noteId: noteId,
        isArchived: "false",
      };
    } else {
      editedNote = {
        noteId: noteId,
        isArchived: "true",
      };
    }

    dispatch(editNote(editedNote));
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

    return () => {
      dispatch(resetDeleteNoteState());
    };
  }, [deleteNoteError, deleteNoteSuccess]);

  useEffect(() => {
    if (editNoteSuccess && editNoteMessage) {
      toast.success(editNoteMessage, {
        toastId: "success-pinned-note-toast",
      });
      dispatch(getNotes());
    }

    return () => {
      dispatch(resetEditNotesState());
    };
  }, [editNoteSuccess]);

  return (
    <>
      <Card className="custom-card">
        <Card.Body>
          {/* Heading and Tag */}
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

          {/* Created at and Updated at */}
          <Card.Subtitle className="mb-2 text-muted">
            <span className="custom-date">
              {" "}
              Created At: {formattedDate(createdAt)}
            </span>
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            <span className="custom-date">
              {" "}
              Updated At: {formattedDate(updatedAt)}
            </span>
          </Card.Subtitle>
          <p></p>

          {/* Buttons */}
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

          {/* Pin Note */}
          <Badge
            bg="light"
            className="badge-button delete"
            onClick={onPinnedClick}
          >
            {isPinned ? <TbPinnedFilled /> : <TbPinned />}
          </Badge>

          {/* Archive Note */}
          <Badge bg="light" className="badge-button" onClick={onArchiveClick}>
            {isArchived ? <BiArchiveOut /> : <BiArchiveIn />}
          </Badge>

          {/* Delete Note */}
          <Badge
            bg="light"
            className="badge-button"
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
        children={
          <EditNote
            title={title}
            body={body}
            tagName={tagName}
            tagId={tagId}
            noteId={noteId}
            closeModal={() => setOpenEditModal(false)}
            isPinned={isPinned}
            isArchived={isArchived}
          />
        }
      />
    </>
  );
}

export default Note;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { NewNoteForm, DynamicContentModal } from "../..";
import {
  editNote,
  getNotesState,
  resetEditNotesState,
  getNotes,
} from "../../../redux/slice/notesSlice";
import { createNoteSchema } from "../CreateNote/Schema";
import ImmersiveMode from "../ImmersiveMode";
import "./index.css";

// @TODO: Review this file
function EditNote({
  title,
  body,
  noteId,
  tagId,
  closeModal,
  isPinned,
  isArchived,
}) {
  const dispatch = useDispatch();

  const tags = useSelector(({ tags }) => tags?.tags);
  const { editNoteLoading, editNoteError, editNoteSuccess, editNoteMessage } =
    useSelector(getNotesState);

  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState(tagId);
  const [isPinnedState, setIsPinnedState] = useState(isPinned);
  const [isArchivedState, setIsArchivedState] = useState(isArchived);

  const initialValues = {
    title: title,
    body: body,
  };

  const onSubmit = (values) => {
    if (selectedTag === "-1") {
      toast.error("Please Select a Tag", { toastId: "no-tag-selected" });
      return;
    }

    if (values?.body.includes(`"`)) {
      toast.error(`"" is not allowed`, { toastId: "no-bad-character" });
      return;
    }

    const editedNoteObj = {
      noteId: noteId,
      heading: values?.title,
      body: values?.body,
      tagId: selectedTag,
      isPinned: isPinnedState ? "true" : "false",
      isArchived: isArchivedState ? "true" : "false",
    };

    dispatch(editNote(editedNoteObj));
  };

  const onSelectChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const transformPinnedValue = (e) => {
    setIsPinnedState(e.target.checked);
  };

  const transformArchivedValue = (e) => {
    setIsArchivedState(e.target.checked);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: createNoteSchema,
      onSubmit: onSubmit,
    });

  useEffect(() => {
    return () => {
      dispatch(resetEditNotesState());
    };
  }, []);

  useEffect(() => {
    if (editNoteError) {
      toast.error(editNoteMessage, { toastId: "failed-edit-note-toast" });
    }

    if (editNoteSuccess) {
      closeModal();
      dispatch(getNotes());
      toast.success(editNoteMessage, {
        toastId: "success-edit-note-toast",
      });
    }
  }, [editNoteError, editNoteSuccess, editNoteMessage]);

  const EditNoteButton = () => {
    return (
      <>
        <div>
          <section className="button-left">
            <Button
              className="btn btn-dark"
              type="submit"
              disabled={editNoteLoading}
            >
              {editNoteLoading ? "Loading…" : "Edit Note"}
            </Button>
          </section>
        </div>
      </>
    );
  };

  const onFullScreenClicked = () => {
    setOpenPreviewModal(true);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="edit-note-form">
        <NewNoteForm
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          onFullScreenClicked={onFullScreenClicked}
          onSelectChange={onSelectChange}
          tagId={tagId}
          tags={tags}
          isPinned={isPinnedState}
          setIsPinned={transformPinnedValue}
          isArchived={isArchivedState}
          setIsArchived={transformArchivedValue}
        />
        <EditNoteButton />
      </Form>
      <DynamicContentModal
        show={openPreviewModal}
        handleClose={() => setOpenPreviewModal(false)}
        title={values.title}
        isFullScreen={true}
        children={
          <ImmersiveMode
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
            handleClose={() => setOpenPreviewModal(false)}
          />
        }
      />
    </>
  );
}

export default EditNote;

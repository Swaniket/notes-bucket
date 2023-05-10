import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { NewNoteForm, DynamicContentModal } from "../..";
import { getTags } from "../../../redux/slice/tagsSlice";
import {
  createNote,
  getNotesState,
  resetCreateNotesState,
  getNotes,
} from "../../../redux/slice/notesSlice";
import { createNoteSchema } from "./Schema";
import "./index.css";
import ImmersiveMode from "../ImmersiveMode";

function CreateNote({ closeModal }) {
  const dispatch = useDispatch();

  const tags = useSelector(({ tags }) => tags?.tags);
  const {
    createNoteError,
    createNoteSuccess,
    createNoteLoading,
    createNoteMessage,
  } = useSelector(getNotesState);

  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState("-1");
  const [isPinnedState, setIsPinnedState] = useState(false);
  const [isArchivedState, setIsArchivedState] = useState(false);

  const initialValues = {
    title: "",
    body: "",
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

    const noteObj = {
      heading: values?.title,
      body: values?.body,
      tagId: selectedTag,
      isPinned: isPinnedState ? "true" : "false",
      isArchived: isArchivedState ? "true" : "false",
    };

    dispatch(createNote(noteObj));
  };

  const onSelectChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: createNoteSchema,
      onSubmit: onSubmit,
    });

  useEffect(() => {
    dispatch(getTags());

    return () => {
      dispatch(resetCreateNotesState());
    };
  }, []);

  useEffect(() => {
    if (createNoteError) {
      toast.error(createNoteMessage, { toastId: "failed-create-note-toast" });
    }

    if (createNoteSuccess) {
      closeModal();
      dispatch(getNotes());
      toast.success(createNoteMessage, {
        toastId: "success-create-note-toast",
      });
    }
  }, [createNoteError, createNoteSuccess, createNoteMessage]);

  const CreateNoteButtons = () => {
    return (
      <>
        <div>
          <section className="button-left">
            <Button
              className="btn btn-dark"
              type="submit"
              disabled={createNoteLoading}
            >
              {createNoteLoading ? "Loading…" : "Create Note"}
            </Button>
          </section>
        </div>
      </>
    );
  };

  const onFullScreenClicked = () => {
    setOpenPreviewModal(true);
  };

  const transformPinnedValue = (e) => {
    setIsPinnedState(e.target.checked);
  };

  const transformArchivedValue = (e) => {
    setIsArchivedState(e.target.checked);
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="create-note-form">
        <NewNoteForm
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          onFullScreenClicked={onFullScreenClicked}
          onSelectChange={onSelectChange}
          tags={tags}
          setIsPinned={transformPinnedValue}
          setIsArchived={transformArchivedValue}
        />
        <CreateNoteButtons />
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

export default CreateNote;

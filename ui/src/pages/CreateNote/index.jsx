import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { createNoteSchema } from "./Schema";
import { NewNote, DynamicModal } from "../../components";
import { getTags, getTagsState } from "../../redux/slice/tagsSlice";
import "./index.css";
import { createNote } from "../../redux/slice/notesSlice";
import { toast } from "react-toastify";

function CreateNote() {
  const dispatch = useDispatch();

  const tags = useSelector(({ tags }) => tags?.tags);

  const [openPreviewModal, setOpenPreviewModal] = useState(false);
  const [selectedTag, setSelectedTag] = useState("-1");

  const initialValues = {
    title: "",
    body: "",
  };

  const onSubmit = (values) => {
    if (selectedTag === "-1") {
      toast.error("Please Select a Tag", { toastId: "no-tag-selected" });
      return;
    }

    const noteObj = {
      heading: values?.title,
      body: values?.body,
      tagId: selectedTag,
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
  }, []);

  const CreateNoteHeader = () => {
    return (
      <section>
        <h1 className="heading">
          {/* <FaSignInAlt style={{ margin: "5px" }} /> */}
          Create a new note
        </h1>

        <p className="heading-sub custom-text-secondary">
          You need to enter a heading, body and choose a tag it belongs to.
        </p>
      </section>
    );
  };

  const CreateNoteButtons = () => {
    return (
      <>
        <div>
          <section className="button-left">
            <Button className="btn btn-dark" type="submit">
              {/* disabled={isLoading} */}
              {/* {isLoading ? "Loading…" : "Login"} */}
              Create Note
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
      <CreateNoteHeader />
      <Form onSubmit={handleSubmit} className="create-note-form">
        <NewNote
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
          onFullScreenClicked={onFullScreenClicked}
          onSelectChange={onSelectChange}
          tags={tags}
        />
        <CreateNoteButtons />
      </Form>
      <DynamicModal
        show={openPreviewModal}
        handleClose={() => setOpenPreviewModal(false)}
        primaryButtonAction={() => setOpenPreviewModal(false)}
        primaryButtonText="Close"
        title={values.title}
        bodyMessage={values.body}
        isRenderedMarkdown={true}
        renderSecondaryButton={false}
        fullScreen={true}
      />
    </>
  );
}

export default CreateNote;

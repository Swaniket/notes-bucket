import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { createNoteSchema } from "./Schema";
import { NewNote, DynamicModal } from "../../components";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getTags, getTagsState } from "../../redux/slice/tagsSlice";

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
    console.log("Values", values);
    console.log("selectedTag", selectedTag);
    // Don't let user continue if selectedTag is "-1"
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

import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { createNoteSchema } from "./Schema";
import { NewNote, DynamicModal } from "../../components";
import "./index.css";

function CreateNote() {
  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const initialValues = {
    title: "",
    body: "",
  };

  const onSubmit = (values) => {
    console.log("Values", values);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: createNoteSchema,
      onSubmit: onSubmit,
    });

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
          // children={<CreateNoteButtons />}
        />
        <CreateNoteButtons />
      </Form>
      <DynamicModal
        show={openPreviewModal}
        handleClose={() => setOpenPreviewModal(false)}
        primaryButtonAction={() => setOpenPreviewModal(false)}
        primaryButtonText="Close"
        title="Preview"
        bodyMessage={values.body}
        isRenderedMarkdown={true}
        renderSecondaryButton={false}
        fullScreen={true}
      />
    </>
  );
}

export default CreateNote;

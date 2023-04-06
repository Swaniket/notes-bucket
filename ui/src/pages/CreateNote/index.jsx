import { useFormik } from "formik";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { createNoteSchema } from "./Schema";
import { NoteDetails } from "../../components";
import "./index.css";

function CreateNote() {
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

  return (
    <>
      <CreateNoteHeader />
      <Form onSubmit={handleSubmit}>
        <NoteDetails
          isEditable={true}
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <CreateNoteButtons />
      </Form>
    </>
  );
}

export default CreateNote;

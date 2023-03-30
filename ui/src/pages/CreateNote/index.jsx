import { useFormik } from "formik";
import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { createNoteSchema } from "./Schema";
import { CreateNoteForm } from "../../components";

function CreateNote() {
  const initialValues = {
    title: "",
    body: "",
  };

  const onSubmit = (values) => {};

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

  return (
    <>
      <CreateNoteHeader />
      <Form onSubmit={handleSubmit}>
        <CreateNoteForm
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
      </Form>
    </>
  );
}

export default CreateNote;

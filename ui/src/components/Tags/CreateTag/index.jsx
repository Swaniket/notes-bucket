import React from "react";
import { useFormik } from "formik";
import { createTagSchema } from "./Schema";
import { Form, Button } from "react-bootstrap";
import { NewTagForm } from "../../index";

function CreateTag() {
  const initialValues = {
    tagName: "",
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: createTagSchema,
      onSubmit: onSubmit,
    });

  const AddTagButton = () => {
    return (
      <>
        <div>
          <section className="button-left">
            <Button
              className="btn btn-dark"
              type="submit"
              // disabled={createNoteLoading}
            >
              {/* {createNoteLoading ? "Loading…" : "Create Note"} */}
              Create Tag
            </Button>
          </section>
        </div>
      </>
    );
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <NewTagForm
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <AddTagButton />
      </Form>
    </>
  );
}

export default CreateTag;

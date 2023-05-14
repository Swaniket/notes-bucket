import React, { useEffect } from "react";
import { useFormik } from "formik";
import { createTagSchema } from "./Schema";
import { Form, Button } from "react-bootstrap";
import { NewTagForm } from "../../index";
import { useDispatch, useSelector } from "react-redux";
import {
  createTag,
  getTagsState,
  getTags,
  resetCreateTag,
} from "../../../redux/slice/tagsSlice";
import { toast } from "react-toastify";

function CreateTag({ closeModal }) {
  const dispatch = useDispatch();

  const {
    createTagError,
    createTagSuccess,
    createTagLoading,
    createTagMessage,
  } = useSelector(getTagsState);

  const initialValues = {
    tagName: "",
  };

  const onSubmit = (values) => {
    dispatch(createTag(values.tagName));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: createTagSchema,
      onSubmit: onSubmit,
    });

  useEffect(() => {
    if (createTagError) {
      toast.error(createTagMessage, { toastId: "failed-create-tag-toast" });
    }

    if (createTagSuccess) {
      closeModal();
      toast.success(createTagMessage, {
        toastId: "success-create-tag-toast",
      });
      dispatch(getTags());
    }

    return () => {
      dispatch(resetCreateTag());
    };
  }, [createTagError, createTagMessage]);

  const AddTagButton = () => {
    return (
      <>
        <div>
          <section className="button-left">
            <Button
              className="btn btn-dark"
              type="submit"
              disabled={createTagLoading}
            >
              {createTagLoading ? "Loading…" : "Create Tag"}
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

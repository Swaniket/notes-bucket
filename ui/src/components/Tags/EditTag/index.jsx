import React, { useEffect } from "react";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createTagSchema } from "../CreateTag/Schema";
import {
  editTag,
  getTagsState,
  getTags,
  resetEditTag,
} from "../../../redux/slice/tagsSlice";
import NewTagForm from "../../Forms/NewTagForm";

function EditTag({ closeModal, id, name }) {
  const dispatch = useDispatch();

  const { editTagError, editTagSuccess, editTagLoading, editTagMessage } =
    useSelector(getTagsState);

  const initialValues = {
    tagId: id,
    tagName: name,
  };

  const onSubmit = (values) => {
    dispatch(editTag(values));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: createTagSchema,
      onSubmit: onSubmit,
    });

  useEffect(() => {
    if (editTagError) {
      toast.error(editTagMessage, { toastId: "failed-edit-tag-toast" });
    }

    if (editTagSuccess) {
      closeModal();
      toast.success(editTagMessage, {
        toastId: "success-edit-tag-toast",
      });
      dispatch(getTags());
    }

    return () => {
      dispatch(resetEditTag());
    };
  }, [editTagError, editTagSuccess, editTagMessage]);

  const EditTagButton = () => {
    return (
      <>
        <div>
          <section className="button-left">
            <Button
              className="btn btn-dark"
              type="submit"
              disabled={editTagLoading}
            >
              {editTagLoading ? "Loading…" : "Edit Tag"}
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
        <EditTagButton />
      </Form>
    </>
  );
}

export default EditTag;

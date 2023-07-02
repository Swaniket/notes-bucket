import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { editProfileSchema } from "./Schema";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import EditProfileForm from "../../Forms/EditProfileForm";
import {
  getUserState,
  getUserProfile,
  updateUserProfile,
  resetUpdateUser,
} from "../../../redux/slice/userSlice";

function EditProfile({ firstName, lastName }) {
  const dispatch = useDispatch();
  const {
    updateUserSuccess,
    updateUserError,
    updateUserLoading,
    updateUserMessage,
  } = useSelector(getUserState);

  const initialValues = {
    firstName: firstName,
    lastName: lastName,
  };

  useEffect(() => {
    if (updateUserError) {
      toast.error(updateUserMessage, { toastId: "failed-edit-user-toast" });
    }

    if (updateUserSuccess) {
      toast.success(updateUserMessage, { toastId: "success-edit-user-toast" });
      dispatch(getUserProfile());
    }

    return () => {
      dispatch(resetUpdateUser());
    };
  }, [updateUserError, updateUserMessage, updateUserSuccess]);

  const onSubmit = (values) => {
    dispatch(updateUserProfile(values));
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: editProfileSchema,
      onSubmit: onSubmit,
    });

  const EditProfileButton = () => {
    return (
      <>
        <div>
          <section className="button-left">
            <Button
              className="btn btn-dark"
              type="submit"
              disabled={updateUserLoading}
            >
              {updateUserLoading ? "Loading…" : "Update Profile"}
            </Button>
          </section>
        </div>
      </>
    );
  };

  return (
    <>
      <div style={{ margin: "40px" }}>
        <h2 style={{ marginBottom: "35px" }}>Update Profile Information</h2>
        <Form onSubmit={handleSubmit}>
          <EditProfileForm
            values={values}
            errors={errors}
            touched={touched}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
          <EditProfileButton />
        </Form>
      </div>
    </>
  );
}

export default EditProfile;

import React from "react";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { editProfileSchema } from "./Schema";
import { Form, Button } from "react-bootstrap";
import EditProfileForm from "../../Forms/EditProfileForm";
import { getAuthState } from "../../../redux/slice/authSlice";

function EditProfile() {
  const { user } = useSelector(getAuthState);

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
  };

  const onSubmit = (values) => {
    console.log("value", values);
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
              //   disabled={editNoteLoading}
            >
              {/* {editNoteLoading ? "Loading…" : "Edit Note"} */}
              Update Profile
            </Button>
          </section>
        </div>
      </>
    );
  };

  return (
    <>
      <div style={{ margin: "40px" }}>
        <h2 style={{ margin: "10px" }}>Update Profile Information</h2>
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

import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import { resetPasswordSchema } from "./schema";
import { Form, Button } from "react-bootstrap";
import { ResetPasswordForm } from "../../components";
import { FaSignInAlt } from "react-icons/fa";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const initialValues = {
    resetPassword: "",
    confirmResetPassword: "",
  };

  const onSubmit = (values) => {
    console.log("values", values);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: resetPasswordSchema,
      onSubmit: onSubmit,
    });

  const ResetPasswordHeader = () => {
    return (
      <section>
        <h1 className="heading">
          <FaSignInAlt style={{ margin: "5px" }} /> Reset Password
        </h1>
        <p className="heading-sub custom-text-secondary">Set a new password</p>
      </section>
    );
  };

  const ResetPasswordButtons = () => {
    return (
      <>
        <div className="button-group-login-signup">
          <section>
            <Button className="btn btn-light" onClick={() => navigate("/")}>
              Login
            </Button>
          </section>
          <section className="login-button-group">
            <Button className="btn btn-dark" type="submit">
              Set Password
              {/* {passwordResetLoading ? "Loading…" : "Send Email"} */}
            </Button>
          </section>
        </div>
      </>
    );
  };

  return (
    <>
      {token ? (
        <div className="custom-container">
          <ResetPasswordHeader />

          <Form onSubmit={handleSubmit}>
            <ResetPasswordForm
              values={values}
              errors={errors}
              touched={touched}
              handleBlur={handleBlur}
              handleChange={handleChange}
            />

            <ResetPasswordButtons />
          </Form>
        </div>
      ) : (
        <h1>No Token Found</h1>
      )}
    </>
  );
}

export default ResetPassword;

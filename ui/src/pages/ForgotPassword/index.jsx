import React from "react";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { forgotPasswordSchema } from "./schema";
import ForgotPasswordForm from "../../components/Forms/ForgotPasswordForm";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

function ForgotPassword() {
  const navigate = useNavigate();

  const initialValues = {
    forgotPasswordEmail: "",
  };

  const onSubmit = (values) => {
    console.log("values", values);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: forgotPasswordSchema,
      onSubmit: onSubmit,
    });

  const ForgotPasswordHeader = () => {
    return (
      <section>
        <h1 className="heading">
          <FaSignInAlt style={{ margin: "5px" }} /> Forgot Password
        </h1>
        <p className="heading-sub custom-text-secondary">
          We will send you an email where you can set a new password
        </p>
      </section>
    );
  };

  const ForgotPasswordButtons = () => {
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
              {/* {isLoading ? "Loading…" : "Login"} */}
              Send Email
            </Button>
          </section>
        </div>
      </>
    );
  };

  return (
    <div className="custom-container">
      <ForgotPasswordHeader />

      <Form onSubmit={handleSubmit}>
        <ForgotPasswordForm
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />

        <ForgotPasswordButtons />
      </Form>
    </div>
  );
}

export default ForgotPassword;

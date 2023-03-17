import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { FaUserPlus } from "react-icons/fa";
import { SignupForm } from "../../components";
import { signUpSchema } from "./Schema";
import "./index.css";

function Signup() {
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit = (values) => {
    console.log("values", values);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: onSubmit,
    });

  const navigateToLogin = () => {
    navigate("/");
  };

  const SignupHeader = () => {
    return (
      <section>
        <h1 className="heading">
          <FaUserPlus style={{ margin: "5px" }} /> Sign Up
        </h1>

        <p className="heading-sub custom-text-secondary">
          Enter your details to Sign Up
        </p>
      </section>
    );
  };

  const SignupButtons = () => {
    return (
      <>
        <div className="button-group-login-signup">
          <section>
            <Button className="btn btn-light" onClick={navigateToLogin}>
              Login Instead
            </Button>
          </section>
          <section className="login-button-group">
            <Button
              className="btn btn-dark"
              type="submit"
              // disabled={isLoading}
            >
              {/* {isLoading ? "Loading…" : "Create Account"} */}
              Create Account
            </Button>
          </section>
        </div>
      </>
    );
  };

  return (
    <div className="custom-container">
      <SignupHeader />
      <Form noValidate onSubmit={handleSubmit}>
        <SignupForm
          values={values}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <SignupButtons />
      </Form>
    </div>
  );
}

export default Signup;

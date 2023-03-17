import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Col, Row, Button, Form } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";
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

  return (
    <div className="custom-container">
      <section>
        <h1 className="heading">
          <FaUserPlus style={{ margin: "5px" }} /> Sign Up
        </h1>

        <p className="heading-sub custom-text-secondary">
          Enter your details to Sign Up
        </p>
      </section>

      <Form noValidate onSubmit={handleSubmit}>
        <Row>
          <Col>
            {/* Firstname */}
            <Form.Group className="mb-3">
              <Form.Label className="field-header">
                <strong>Enter Your Firstname</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Jhon"
                id="firstName"
                name="firstName"
                autoComplete="off"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.firstName && !!errors.firstName}
                isValid={touched.firstName && !errors.firstName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            {/* Lastname */}
            <Form.Group className="mb-3">
              <Form.Label className="field-header">
                <strong>Enter Your Lastname</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Doe"
                id="lastName"
                name="lastName"
                autoComplete="off"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.lastName && !!errors.lastName}
                isValid={touched.lastName && !errors.lastName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label className="field-header">
            <strong>Enter Your Email</strong>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="name@domain.com"
            id="email"
            name="email"
            autoComplete="off"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.email && !!errors.email}
            isValid={touched.email && !errors.email}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Password */}
        <Form.Group className="mb-3">
          <Form.Label className="field-header">
            <strong>Choose a Password</strong>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="choose a strong password"
            id="password"
            name="password"
            autoComplete="off"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.password && !!errors.password}
            isValid={touched.password && !errors.password}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Confirm Password */}
        <Form.Group className="mb-3">
          <Form.Label className="field-header">
            <strong>Confirm Password</strong>
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="retype your password"
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="off"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.confirmPassword && !!errors.confirmPassword}
            isValid={touched.confirmPassword && !errors.confirmPassword}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Buttons */}
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
      </Form>
    </div>
  );
}

export default Signup;

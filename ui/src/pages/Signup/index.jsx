import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { FaUserPlus } from "react-icons/fa";
import "./index.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { firstname, lastName, email, password, confirmPassword } = formData;

  const clearForm = () => {};

  const navigateToLogin = () => {
    navigate("/");
  };

  const onChange = () => {};

  const onSubmit = () => {};

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

      <Form onSubmit={onSubmit}>
        {/* Firstname */}
        <Form.Group className="mb-3">
          <Form.Label className="field-header">
            <strong>Enter Your Firstname</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Jhon"
            id="firstName"
            value={firstname}
            name="firstName"
            onChange={onChange}
            required
          />
        </Form.Group>
        {/* Lastname */}
        <Form.Group className="mb-3">
          <Form.Label className="field-header">
            <strong>Enter Your Lastname</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Doe"
            id="lastName"
            value={lastName}
            name="lastName"
            onChange={onChange}
            required
          />
        </Form.Group>
        {/* Email */}
        <Form.Group className="mb-3">
          <Form.Label className="field-header">
            <strong>Enter Your Email</strong>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="name@domain.com"
            id="email"
            value={email}
            name="email"
            onChange={onChange}
            required
          />
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
            value={password}
            name="password"
            onChange={onChange}
            required
          />
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
            value={confirmPassword}
            name="confirmPassword"
            onChange={onChange}
            required
          />
        </Form.Group>

        {/* Buttons */}
        <div className="button-group-login-signup">
          <section>
            Already have an account?
            <Button className="btn btn-link" onClick={navigateToLogin}>
              Login
            </Button>
          </section>
          <section className="login-button-group">
            <Button
              className="btn btn-light"
              style={{ marginRight: "10px" }}
              onClick={clearForm}
            >
              Clear
            </Button>
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

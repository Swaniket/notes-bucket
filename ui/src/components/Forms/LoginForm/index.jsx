import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginForm({
  values,
  errors,
  touched,
  rememberMe,
  handleBlur,
  handleChange,
  setRememberMe,
}) {
  return (
    <>
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
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>
      {/* Password */}
      <Form.Group className="mb-3">
        <Form.Label className="field-header">
          <strong>Enter Your Password</strong>
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="enter your password"
          id="password"
          name="password"
          autoComplete="off"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.password && !!errors.password}
          isValid={touched.password && !errors.password}
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>
      {/* Remember Me */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Remember Me"
            id="rememberMe"
            value={rememberMe}
            name="rememberMe"
            className="remember-me"
            onChange={() => {
              setRememberMe(!rememberMe);
            }}
          />
        </Form.Group>
        <Link
          to="forgot-password"
          style={{ textDecoration: "none", color: "gray" }}
        >
          Forgot Password?
        </Link>
      </div>
    </>
  );
}

export default LoginForm;

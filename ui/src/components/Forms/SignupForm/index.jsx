import React from "react";
import { Col, Row, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

function SignupForm({ values, errors, touched, handleBlur, handleChange }) {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h5">Password Policy</Popover.Header>
      <Popover.Body>
        <strong>Password Must be</strong>
        <ul>
          <li>Minimum eight characters</li>
          <li>At least one uppercase letter</li>
          <li>At least one lowercase letter</li>
          <li>At least one number</li>
          <li>At least one special character</li>
        </ul>
      </Popover.Body>
    </Popover>
  );

  const PasswordPolicy = () => {
    return (
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ paddingLeft: "7px" }}>
          <FaInfoCircle />
        </span>
      </OverlayTrigger>
    );
  };

  return (
    <>
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
          <PasswordPolicy />
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
    </>
  );
}

export default SignupForm;

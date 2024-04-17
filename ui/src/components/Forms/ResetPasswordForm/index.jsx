import React from "react";
import { Form, OverlayTrigger, Popover } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";

function ResetPasswordForm({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) {
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
      <OverlayTrigger placement="top" overlay={popover}>
        <span style={{ paddingLeft: "7px" }}>
          <FaInfoCircle />
        </span>
      </OverlayTrigger>
    );
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label className="field-header">
          <strong>Enter new password</strong>
          <PasswordPolicy />
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="enter your password"
          id="resetPassword"
          name="resetPassword"
          autoComplete="off"
          value={values.resetPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.resetPassword && !!errors.resetPassword}
          isValid={touched.resetPassword && !errors.resetPassword}
        />
        <Form.Control.Feedback type="invalid">
          {errors.resetPassword}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Confirm Password */}
      <Form.Group className="mb-3">
        <Form.Label className="field-header">
          <strong>Retype your password</strong>
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="enter your password"
          id="confirmResetPassword"
          name="confirmResetPassword"
          autoComplete="off"
          value={values.confirmResetPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={
            touched.confirmResetPassword && !!errors.confirmResetPassword
          }
          isValid={touched.confirmResetPassword && !errors.confirmResetPassword}
        />
        <Form.Control.Feedback type="invalid">
          {errors.confirmResetPassword}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}

export default ResetPasswordForm;

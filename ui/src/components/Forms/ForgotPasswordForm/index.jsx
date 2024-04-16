import React from "react";
import { Form } from "react-bootstrap";

function ForgotPasswordForm({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
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
          id="forgotPasswordEmail"
          name="forgotPasswordEmail"
          autoComplete="off"
          value={values.forgotPasswordEmail}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={
            touched.forgotPasswordEmail && !!errors.forgotPasswordEmail
          }
          isValid={touched.forgotPasswordEmail && !errors.forgotPasswordEmail}
        />
        <Form.Control.Feedback type="invalid">
          {errors.forgotPasswordEmail}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}

export default ForgotPasswordForm;

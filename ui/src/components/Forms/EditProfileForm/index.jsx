import React from "react";
import { Form } from "react-bootstrap";

function EditProfileForm({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) {
  return (
    <>
      {/* FirstName */}
      <Form.Group className="mb-3">
        <Form.Label className="field-header">
          <strong>Firstname</strong>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your firstname"
          id="firstName"
          name="firstName"
          autoComplete="off"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.firstName && !!errors.firstName}
          isValid={touched.firstName && !errors.firstName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.firstName}
        </Form.Control.Feedback>
      </Form.Group>

      {/* Lastname */}
      <Form.Group className="mb-3">
        <Form.Label className="field-header">
          <strong>Lastname</strong>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your lastname"
          id="lastName"
          name="lastName"
          autoComplete="off"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.lastName && !!errors.lastName}
          isValid={touched.lastName && !errors.lastName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.lastName}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}

export default EditProfileForm;

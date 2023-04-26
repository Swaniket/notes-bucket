import React from "react";
import { Form } from "react-bootstrap";

function NewTagForm({ values, errors, touched, handleBlur, handleChange }) {
  return (
    <>
      {/* Tag Name */}
      <Form.Group className="mb-3">
        <Form.Label className="field-header">
          <strong>Tag Name *</strong>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter the tag name"
          id="tagName"
          name="tagName"
          autoComplete="off"
          value={values.tagName}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched.tagName && !!errors.tagName}
          isValid={touched.tagName && !errors.tagName}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}

export default NewTagForm;

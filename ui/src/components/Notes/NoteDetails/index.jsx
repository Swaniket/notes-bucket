import React from "react";
import ReactMarkdown from "react-markdown";
import { Row, Col, Form } from "react-bootstrap";

function NoteDetails({
  title = "",
  body = "",
  isEditable = false,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
}) {
  return (
    <>
      {/* Title */}
      <Form.Group className="mb-3">
        <Form.Label className="field-header">
          <strong>Title</strong>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          id="title"
          name="title"
          autoComplete="off"
          value={isEditable ? values.title : title}
          onChange={isEditable ? handleChange : () => {}}
          onBlur={isEditable ? handleBlur : () => {}}
          disabled={!isEditable}
          isInvalid={touched.title && !!errors.title}
          isValid={touched.title && !errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Row>
        <Col>
          {/* Body */}
          <Form.Group className="mb-3">
            <Form.Label className="field-header">
              <strong>Body</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Body"
              id="body"
              name="body"
              autoComplete="off"
              value={isEditable ? values.body : body}
              onChange={isEditable ? handleChange : () => {}}
              onBlur={isEditable ? handleBlur : () => {}}
              disabled={!isEditable}
              isInvalid={touched.body && !!errors.body}
              isValid={touched.body && !errors.body}
            />
            <Form.Control.Feedback type="invalid">
              {errors.body}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className="field-header">
              <strong>Preview</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Preview Note"
              id="password"
              name="password"
              autoComplete="off"
              value={values.body}
              disabled
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
}

export default NoteDetails;

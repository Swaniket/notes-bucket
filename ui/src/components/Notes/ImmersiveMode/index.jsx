import React from "react";
import { Row, Col, Form, Alert, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import "./index.css";

function ImmersiveMode({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleClose,
}) {
  return (
    <>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label className="field-header">
              <strong>Body *</strong>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={20}
              placeholder="Body"
              id="body"
              name="body"
              autoComplete="off"
              value={values.body}
              onChange={handleChange}
              onBlur={handleBlur}
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
            <Alert variant="light" className="preview-immersive">
              <ReactMarkdown>{values.body}</ReactMarkdown>
            </Alert>
          </Form.Group>
        </Col>
      </Row>

      <span className="save-close-button">
        <Button variant="outline-dark" onClick={handleClose}>
          Save & Close
        </Button>
      </span>
    </>
  );
}

export default ImmersiveMode;

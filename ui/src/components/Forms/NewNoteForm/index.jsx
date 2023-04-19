import React from "react";
import ReactMarkdown from "react-markdown";
import { Row, Col, Form, Alert } from "react-bootstrap";
import { AiOutlineFullscreen } from "react-icons/ai";
import "./index.css";

function NewNoteForm({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  onFullScreenClicked,
  onSelectChange,
  tags,
}) {
  return (
    <>
      <Row>
        <Col>
          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label className="field-header">
              <strong>Title *</strong>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              id="title"
              name="title"
              autoComplete="off"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.title && !!errors.title}
              isValid={touched.title && !errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col>
          {/* Tag */}
          <Form.Group className="mb-3">
            <Form.Label className="field-header">
              <strong>Tag *</strong>
            </Form.Label>
            <Form.Select onChange={onSelectChange}>
              <option value="-1">Select Tag</option>
              {tags.map((tag) => (
                <option key={tag?.tagId} value={tag?.tagId}>
                  {tag?.tagName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <>
        {/* Body */}
        <Form.Group className="mb-3">
          <Form.Label className="field-header">
            <strong>Body *</strong>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={7}
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
      </>

      <Form.Group className="mb-3">
        <Form.Label className="field-header">
          <strong>Preview</strong>
          <span style={{ cursor: "pointer" }} onClick={onFullScreenClicked}>
            <AiOutlineFullscreen />
          </span>
        </Form.Label>
        <Alert variant="light" className="preview">
          <ReactMarkdown>{values.body}</ReactMarkdown>
        </Alert>
      </Form.Group>
    </>
  );
}

export default NewNoteForm;

import React from "react";
import { Card, Badge } from "react-bootstrap";
import "./index.css";
import { FaEye, FaPenAlt, FaTrashAlt } from "react-icons/fa";

function Note({ title, body, createdAt, updatedAt, tagName }) {
  return (
    <Card className="note-card">
      <Card.Body>
        <Card.Title className="custom-title">
          {title}
          <h6>
            <Badge pill bg="dark">
              <small>{tagName}</small>
            </Badge>
          </h6>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Created At: <small>{createdAt}</small>
        </Card.Subtitle>
        <Card.Text className="limited-text">{body}</Card.Text>
        <Badge bg="light" text="dark" className="badge-button">
          <FaEye /> View
        </Badge>
        <Badge bg="dark" className="badge-button">
          <FaPenAlt /> Edit
        </Badge>

        <Badge bg="light" className="badge-button delete">
          <FaTrashAlt />
        </Badge>
      </Card.Body>
    </Card>
  );
}

export default Note;

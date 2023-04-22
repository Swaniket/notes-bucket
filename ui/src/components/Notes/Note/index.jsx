import React, { useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { FaEye, FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { formattedDate } from "../../../utils/formatDate";
import "./index.css";
import DynamicModal from "../../Modals/DynamicModal";

function Note({ title, body, createdAt, updatedAt, tagName }) {
  const [openViewModal, setOpenViewModal] = useState(false);
  return (
    <>
      <Card className="note-card">
        <Card.Body>
          <Card.Title className="custom-title mb-0">
            <h6>
              <span className="limited-text">{title}</span>
            </h6>
            <h6>
              <Badge pill bg="dark">
                <small>{tagName}</small>
              </Badge>
            </h6>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <small> Created: {formattedDate(createdAt)}</small>
          </Card.Subtitle>
          <p></p>
          <Badge
            bg="light"
            text="dark"
            className="badge-button"
            onClick={() => setOpenViewModal(true)}
          >
            <FaEye /> View
          </Badge>
          <Badge bg="dark" className="badge-button">
            <FaPenAlt /> Edit
          </Badge>

          <Badge bg="light" className="badge-button delete">
            <FaTrashAlt color="brown" />
          </Badge>
        </Card.Body>
      </Card>
      <DynamicModal
        show={openViewModal}
        handleClose={() => setOpenViewModal(false)}
        primaryButtonAction={() => setOpenViewModal(false)}
        primaryButtonText="Close"
        title={title}
        bodyMessage={body}
        isRenderedMarkdown={true}
        renderSecondaryButton={false}
        fullScreen={true}
      />
    </>
  );
}

export default Note;

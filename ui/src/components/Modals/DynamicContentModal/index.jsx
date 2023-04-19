import React from "react";
import { Button, Modal, Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import "./style.css";

function DynamicComponentModal({ show, handleClose, title, children }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
      // dialogClassName="modal-90w"
      // fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>{children}</Container>
      </Modal.Body>
    </Modal>
  );
}

export default DynamicComponentModal;

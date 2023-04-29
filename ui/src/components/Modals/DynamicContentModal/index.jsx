import React from "react";
import { Button, Modal, Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import "./style.css";

/*
  show - State for Show or hiding
  handleClose - Function runs on modal close
  title - Title of the modal
  children - Children to render out
*/

function DynamicComponentModal({
  show,
  handleClose,
  title,
  isFullScreen = false,
  children,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      size="lg"
      fullscreen={isFullScreen}
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

import React from "react";
import { Button, Modal, Container, Form, Row, Col } from "react-bootstrap";

function ConfirmAction({
  show,
  handleClose,
  onConfirmClick,
  title,
  bodyMessage,
  confirmMessage,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>{bodyMessage}</Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onConfirmClick}>
          {confirmMessage}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmAction;

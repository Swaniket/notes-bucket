import React from "react";
import { Button, Modal, Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

/*
  show - State for Show or hiding
  handleClose - Function runs on modal close
  primaryButtonAction - Function that runs on click of the primary button
  primaryButtonText - Text shown in the primary button
  title - title of the modal
  bodyMessage - modal body
  isRenderedMarkdown - flag to render body as markdown
  renderSecondaryButton - Flag to render secondary button
  secondaryButtonText - Text to show in secondary button
  fullScreen - If the modal will show in full screen
*/

function DynamicModal({
  show,
  handleClose,
  primaryButtonAction,
  primaryButtonText,
  title = "",
  bodyMessage = "",
  isRenderedMarkdown = false,
  renderSecondaryButton = true,
  secondaryButtonText = "",
  fullScreen = false,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      fullscreen={fullScreen}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {isRenderedMarkdown ? (
            <ReactMarkdown>{bodyMessage}</ReactMarkdown>
          ) : (
            bodyMessage
          )}
        </Container>
      </Modal.Body>

      <Modal.Footer>
        {renderSecondaryButton && (
          <Button variant="outline-dark" onClick={handleClose}>
            {secondaryButtonText}
          </Button>
        )}
        <Button variant="danger" onClick={primaryButtonAction}>
          {primaryButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DynamicModal;

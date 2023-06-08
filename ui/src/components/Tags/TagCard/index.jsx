import React, { useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { DynamicContentModal, EditTag } from "../..";
import "./index.css";

function TagCard({ id, name }) {
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <>
      <Card className="custom-card tags-card">
        <Card.Body>
          {/* Heading and Tag */}
          <Card.Title
            className="custom-title mb-0"
            style={{ alignItems: "center" }}
          >
            <h6>
              <span className="limited-text">{name}</span>
            </h6>

            <h6>
              <Badge
                bg="dark"
                className="badge-button"
                onClick={() => setOpenEditModal(true)}
              >
                <FaPenAlt />
              </Badge>
              <Badge
                bg="light"
                className="badge-button"
                // onClick={() => setOpenDeleteConfirmationModal(true)}
              >
                <FaTrashAlt color="brown" />
              </Badge>
            </h6>
          </Card.Title>
        </Card.Body>
      </Card>
      <DynamicContentModal
        show={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        title="Edit Tag"
        children={
          <EditTag
            closeModal={() => setOpenEditModal(false)}
            id={id}
            name={name}
          />
        }
      />
    </>
  );
}

export default TagCard;

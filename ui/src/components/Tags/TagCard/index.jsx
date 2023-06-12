import React, { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { FaPenAlt, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { DynamicContentModal, DynamicModal, EditTag } from "../..";
import {
  getTags,
  deleteTag,
  getTagsState,
  resetDeleteTag,
} from "../../../redux/slice/tagsSlice";
import "./index.css";

function TagCard({ id, name }) {
  const dispatch = useDispatch();
  const { deleteTagError, deleteTagSuccess } = useSelector(getTagsState);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);

  const onDeleteTag = () => {
    dispatch(deleteTag(id));
  };

  useEffect(() => {
    if (deleteTagError) {
      toast.error("Tag could not be deleted", {
        toastId: "failed-delete-tag-toast",
      });
    }

    if (deleteTagSuccess) {
      setOpenDeleteConfirmationModal(false);
      dispatch(getTags());
      toast.success("Tag deleted successfully", {
        toastId: "success-delete-tag-toast",
      });
    }

    return () => {
      dispatch(resetDeleteTag());
    };
  }, [deleteTagError, deleteTagSuccess]);

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
                onClick={() => setOpenDeleteConfirmationModal(true)}
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
      <DynamicModal
        show={openDeleteConfirmationModal}
        handleClose={() => setOpenDeleteConfirmationModal(false)}
        primaryButtonAction={onDeleteTag}
        primaryButtonText="Delete"
        title="Caution!"
        bodyMessage="Are you sure you want to delete this tag? **All the notes under this tag will also be deleted.** This action is irreversible."
        secondaryButtonText="Cancel"
        isRenderedMarkdown={true}
      />
    </>
  );
}

export default TagCard;

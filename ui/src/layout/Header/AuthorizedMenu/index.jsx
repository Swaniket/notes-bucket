import React from "react";
import { Dropdown, Button, Offcanvas } from "react-bootstrap";
import { FaSignOutAlt, FaTags } from "react-icons/fa";
import { BiArchive, BiTrash } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import { TbSettings2, TbPinnedFilled, TbNotes } from "react-icons/tb";

function AuthorizedMenu({
  showMenu,
  handleMenuShow,
  handleMenuClose,
  user,
  onAllNotesClicked,
  onPinnedClicked,
  onArchiveClicked,
  onAddClicked,
  onManageClicked,
  onLogoutClicked,
}) {
  return (
    <>
      <div onClick={handleMenuShow}>
        <TbSettings2 size={30} style={{ color: "black", cursor: "pointer" }} />
      </div>

      <Offcanvas
        show={showMenu}
        onHide={handleMenuClose}
        placement="end"
        style={{ width: "15%" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Settings</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <h6>
            Welcome, <strong>{user?.firstName}</strong>
          </h6>{" "}
          <span>
            <small>
              <strong>{user?.email}</strong>
            </small>
          </span>
          <hr />
          <Button size="sm" className="btn btn-dark w-100">
            View Profile
          </Button>
          <hr />
          <Dropdown.Header className="offcanvas-items">Notes</Dropdown.Header>
          <Dropdown.Item
            onClick={onAllNotesClicked}
            className="offcanvas-items"
          >
            <TbNotes /> All Notes{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={onPinnedClicked} className="offcanvas-items">
            <TbPinnedFilled /> Pinned Notes{" "}
          </Dropdown.Item>
          <Dropdown.Item onClick={onArchiveClicked} className="offcanvas-items">
            <BiArchive /> Archived Notes{" "}
          </Dropdown.Item>
          <hr />
          <Dropdown.Header className="offcanvas-items">Tags</Dropdown.Header>
          <Dropdown.Item onClick={onAddClicked} className="offcanvas-items">
            <GrAdd /> Add Tag
          </Dropdown.Item>
          <Dropdown.Item onClick={onManageClicked} className="offcanvas-items">
            <FaTags /> Manage Tags
          </Dropdown.Item>
          <div className="footer">
            <hr />
            <Dropdown.Item
              onClick={onLogoutClicked}
              className="offcanvas-items"
            >
              <FaSignOutAlt /> Logout
            </Dropdown.Item>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AuthorizedMenu;

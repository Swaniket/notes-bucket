import React from "react";
import { Dropdown, Button, Offcanvas } from "react-bootstrap";
import { FaSignOutAlt, FaTags, FaInfoCircle } from "react-icons/fa";
import { BiArchive } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import { TbNotes } from "react-icons/tb";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";

function AuthorizedMenu({
  showMenu,
  handleMenuShow,
  handleMenuClose,
  user,
  onViewProfileClicked,
  onAllNotesClicked,
  onArchiveClicked,
  onAddClicked,
  onManageClicked,
  onLogoutClicked,
  onAboutClicked,
}) {
  return (
    <>
      <div onClick={handleMenuShow}>
        <HiOutlineMenuAlt1
          size={30}
          style={{ color: "black", cursor: "pointer" }}
        />
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
              <strong>E:</strong> {user?.email}
            </small>
          </span>
          <hr />
          <Button
            size="sm"
            className="btn btn-dark w-100"
            onClick={onViewProfileClicked}
          >
            <BsFillPersonFill
              style={{ marginBottom: "2px", marginRight: "1px" }}
            />
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
            <hr />
            <Dropdown.Item onClick={onAboutClicked} className="offcanvas-items">
              <FaInfoCircle /> About
            </Dropdown.Item>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AuthorizedMenu;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  Dropdown,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { FaSignOutAlt, FaTags, FaMapPin, FaArchive } from "react-icons/fa";
import { AiTwotoneSetting } from "react-icons/ai";
import { MdMenu } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAuthState, logout, reset } from "../../redux/slice/authSlice";
import { ConfirmAction, SearchBar } from "../../components";
import "./index.css";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { user } = useSelector(getAuthState);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    toast.success("Logout successful", { toastId: "logout-success" });
    setOpenConfirmModal(false);
  };

  const closeConfirmModal = () => {
    setOpenConfirmModal(false);
  };

  const onLogoutClicked = () => {
    setShowMenu(false);
    setOpenConfirmModal(true);
  };

  const onArchiveClicked = () => {
    console.log("Archive is clicked");
  };
  const onPinnedClicked = () => {
    console.log("Pinned is clicked");
  };
  const onManageClicked = () => {
    console.log("Manage is clicked");
  };

  const handleMenuClose = () => setShowMenu(false);
  const handleMenuShow = () => setShowMenu(true);

  const HeaderLogo = () => {
    return (
      <Link to="/home" className="header-logo">
        <h4>
          &#9997; notes
          <small className="text-muted"> BUCKET</small>
        </h4>
      </Link>
    );
  };

  const AuthorizedMenu = () => {
    return (
      <>
        <div onClick={handleMenuShow}>
          <MdMenu size={35} style={{ color: "black", cursor: "pointer" }} />
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
            <Dropdown.Item
              onClick={onArchiveClicked}
              className="offcanvas-items"
            >
              <FaArchive /> Archived Notes{" "}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={onPinnedClicked}
              className="offcanvas-items"
            >
              <FaMapPin /> Pinned Notes{" "}
            </Dropdown.Item>
            <hr />
            <Dropdown.Item
              onClick={onManageClicked}
              className="offcanvas-items"
            >
              <FaTags /> Manage Tags
            </Dropdown.Item>
            <Dropdown.Item
              onClick={onLogoutClicked}
              className="offcanvas-items"
            >
              <FaSignOutAlt /> Logout
            </Dropdown.Item>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  };

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <HeaderLogo />
          </Navbar.Brand>
          <Navbar.Toggle />
          <SearchBar />
          <Navbar.Collapse className="justify-content-end">
            {user && <AuthorizedMenu />}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ConfirmAction
        show={openConfirmModal}
        handleClose={closeConfirmModal}
        onConfirmClick={onLogout}
        title="Caution!"
        bodyMessage="Are you sure you want to logout?"
        confirmMessage="Yes, Log me out"
      />
    </div>
  );
}

export default Header;

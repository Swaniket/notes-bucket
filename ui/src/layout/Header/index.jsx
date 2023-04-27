import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Navbar,
  Container,
  Dropdown,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { FaSignOutAlt, FaTags, FaMapPin, FaArchive } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import { TbSettings2 } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAuthState, logout, reset } from "../../redux/slice/authSlice";
import {
  DynamicModal,
  DynamicContentModal,
  SearchBar,
  CreateTag,
} from "../../components";
import "./index.css";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("location", location.pathname);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openAddTagModal, setOpenAddTagModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { user } = useSelector(getAuthState);

  const handleMenuClose = () => setShowMenu(false);
  const handleMenuShow = () => setShowMenu(true);

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
    handleMenuClose();
    navigate("/tags");
  };

  const onAddClicked = () => {
    setShowMenu(false);
    setOpenAddTagModal(true);
  };

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
          <TbSettings2
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
            <Dropdown.Header className="offcanvas-items">Tags</Dropdown.Header>
            <Dropdown.Item onClick={onAddClicked} className="offcanvas-items">
              <GrAdd /> Add Tag
            </Dropdown.Item>
            <Dropdown.Item
              onClick={onManageClicked}
              className="offcanvas-items"
            >
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
  };

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <HeaderLogo />
          </Navbar.Brand>
          <Navbar.Toggle />
          {location.pathname === "/home" && <SearchBar />}

          <Navbar.Collapse className="justify-content-end">
            {user && <AuthorizedMenu />}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <DynamicModal
        show={openConfirmModal}
        handleClose={closeConfirmModal}
        primaryButtonAction={onLogout}
        primaryButtonText="Yes, Log me out"
        title="Caution!"
        bodyMessage="Are you sure you want to logout?"
        secondaryButtonText="Close"
      />
      <DynamicContentModal
        show={openAddTagModal}
        handleClose={() => setOpenAddTagModal(false)}
        title="Add a new Tag"
        children={<CreateTag closeModal={() => setOpenAddTagModal(false)} />}
      />
    </div>
  );
}

export default Header;

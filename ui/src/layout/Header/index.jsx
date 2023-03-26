import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Dropdown, Button } from "react-bootstrap";
import { FaSignOutAlt, FaTags, FaMapPin, FaArchive } from "react-icons/fa";
import { AiTwotoneSetting } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getAuthState, logout, reset } from "../../redux/slice/authSlice";
import { ConfirmAction } from "../../components";
import "./index.css";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

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

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <span className="profile-selector">
        <AiTwotoneSetting size={25} style={{ color: "black" }} />
        <span className="profile-name">
          <strong>Settings</strong>
        </span>
      </span>
      {children}
    </a>
  ));

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
        <Dropdown align="end">
          <Dropdown.Toggle
            as={CustomToggle}
            id="dropdown-custom-components"
          ></Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Header>
              <small>
                Welcome, <strong>{user?.firstName}</strong>
              </small>{" "}
              <br />
              <span>
                <strong>{user?.email}</strong>
              </span>
            </Dropdown.Header>
            <Dropdown.Header className="profile-button d-grid gap-2">
              <Button size="sm" className="btn btn-dark">
                View Profile
              </Button>
            </Dropdown.Header>
            <hr />
            <Dropdown.Item onClick={onArchiveClicked}>
              {" "}
              <FaArchive /> Archived Notes
            </Dropdown.Item>
            <Dropdown.Item onClick={onPinnedClicked}>
              {" "}
              <FaMapPin /> Pinned Notes
            </Dropdown.Item>
            <hr />
            <Dropdown.Item onClick={onManageClicked}>
              {" "}
              <FaTags /> Manage Tags
            </Dropdown.Item>
            <Dropdown.Item onClick={onLogoutClicked}>
              {" "}
              <FaSignOutAlt /> Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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

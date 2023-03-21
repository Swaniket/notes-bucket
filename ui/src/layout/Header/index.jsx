import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Dropdown, Button } from "react-bootstrap";
import {
  FaSignOutAlt,
  FaTools,
  FaUserCircle,
  FaArrowAltCircleDown,
} from "react-icons/fa";
import {
  AiFillSetting,
  AiOutlineSetting,
  AiTwotoneSetting,
} from "react-icons/ai";
import "./index.css";

function Header() {
  const onLogout = () => {};

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
        <AiTwotoneSetting size={29} style={{ color: "black" }} />
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
                Welcome, <strong>Swaniket Chowdhury</strong>
              </small>{" "}
              <p>swaniket@email.com</p>
            </Dropdown.Header>
            <Dropdown.Header>
              <Button>View Profile</Button>
            </Dropdown.Header>
            <hr />
            <Dropdown.Item>Profile</Dropdown.Item>
            <hr />
            <Dropdown.Item onClick={onLogout}>
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
            <AuthorizedMenu />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;

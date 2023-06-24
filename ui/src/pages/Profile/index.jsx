import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { ProfileStats, EditProfile } from "../../components";

function Profile() {
  // @TODO: Make this dynamic
  return (
    <div style={{ margin: "40px" }}>
      <Row>
        <Col xs lg="5">
          <div>
            <h2 style={{ margin: "10px" }}>Welcome, Swaniket</h2>
            <h6 style={{ margin: "10px" }}>Email: swaniket@email.com</h6>
          </div>
          <ProfileStats />
        </Col>
        <Col>
          <EditProfile />
        </Col>
      </Row>
    </div>
  );
}

export default Profile;

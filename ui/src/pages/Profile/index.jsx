import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card, Button } from "react-bootstrap";
import {
  ProfileStats,
  EditProfile,
  ProfileGeneralInformation,
} from "../../components";
import { getUserState } from "../../redux/slice/userSlice";

function Profile() {
  const { user } = useSelector(getUserState);

  return (
    <div style={{ margin: "40px" }}>
      <Row>
        <Col xs lg="5">
          <ProfileGeneralInformation user={user} />
          <ProfileStats />
        </Col>
        <Col>
          <EditProfile firstName={user?.firstName} lastName={user?.lastName} />
        </Col>
      </Row>
    </div>
  );
}

export default Profile;

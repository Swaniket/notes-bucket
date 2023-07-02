import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "react-bootstrap";
import {
  ProfileStats,
  EditProfile,
  ProfileGeneralInformation,
} from "../../components";
import { getUserState, getUserProfile } from "../../redux/slice/userSlice";

function Profile() {
  const dispatch = useDispatch();

  const { userProfile } = useSelector(getUserState);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <div style={{ margin: "40px" }}>
      <Row>
        <Col xs lg="5">
          <ProfileGeneralInformation
            firstName={userProfile?.firstName}
            email={userProfile?.email}
          />
          <ProfileStats userStats={userProfile?.stats} />
        </Col>
        <Col>
          {userProfile?.firstName && userProfile?.lastName && (
            <EditProfile
              firstName={userProfile?.firstName}
              lastName={userProfile?.lastName}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Profile;

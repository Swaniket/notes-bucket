import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, getUserState } from "../../../redux/slice/userSlice";
import "./index.css";

function ProfileStats() {
  const dispatch = useDispatch();
  const { userStats } = useSelector(getUserState);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <>
      <Card className="profile-stats-card">
        <Card.Body className="profile-stats-card-body">
          <h3>{userStats?.totalNotes}</h3>
          <p>Total Notes</p>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "white" }}>
          <Button size="sm" className="btn btn-dark w-100">
            View Notes
          </Button>
        </Card.Footer>
      </Card>
      <Card className="profile-stats-card">
        <Card.Body className="profile-stats-card-body">
          <h3>{userStats?.archivedNotes}</h3>
          <p>Archived Notes</p>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "white" }}>
          <Button size="sm" className="btn btn-dark w-100">
            View Archived Notes
          </Button>
        </Card.Footer>
      </Card>
    </>
  );
}

export default ProfileStats;

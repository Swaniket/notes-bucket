import React from "react";
import { Card, Button } from "react-bootstrap";

function ProfileStats() {
  return (
    <>
      <Card style={{ margin: "40px" }}>
        <Card.Body style={{ textAlign: "center", paddingBottom: 0 }}>
          3
          <p>
            <strong>Total Notes</strong>
          </p>
        </Card.Body>
        <Card.Footer style={{ backgroundColor: "white" }}>
          <Button size="sm" className="btn btn-dark w-100">
            View Notes
          </Button>
        </Card.Footer>
      </Card>
      <Card style={{ margin: "40px" }}>
        <Card.Body style={{ textAlign: "center", paddingBottom: 0 }}>
          2
          <p>
            <strong>Archived Notes</strong>
          </p>
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

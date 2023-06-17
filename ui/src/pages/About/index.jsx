import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./index.css";

function About() {
  return (
    <Container>
      <div className="about-wrapper">
        <Card className="about-item-card">
          <h6>Created with &#10084; by Swaniket Chowdhury</h6>
          <span>
            View the source code in{" "}
            <a href="https:github.com/Swaniket/notes-bucket">Github</a>
          </span>
        </Card>
        <Row>
          <Col>
            <Card className="about-item-card">
              <h5 className="text-uppercase">Tech stack</h5>
              <ul className="list-unstyled">
                <li>ReactJS</li>
                <li>Redux</li>
                <li>NodeJS</li>
                <li>MySQL</li>
              </ul>
            </Card>
          </Col>
          <Col>
            <Card className="about-item-card">
              <h5 className="text-uppercase">Connect with me</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="https://www.linkedin.com/in/swaniketchowdhury/">
                    My Linkedin
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Swaniket">My Github</a>
                </li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default About;

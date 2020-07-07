import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { SignupCard } from "../components/";

function Signup() {
  return (
    <Container>
      <Row>
        <Col>
          <SignupCard />
        </Col>
      </Row>
    </Container>
  );
}

export { Signup };

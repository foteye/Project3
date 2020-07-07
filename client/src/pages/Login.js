import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { LoginCard } from "../components/";

function Login() {
  return (
    <Container>
      <Row>
        <Col>
          <LoginCard />
        </Col>
      </Row>
    </Container>
  );
}

export { Login };

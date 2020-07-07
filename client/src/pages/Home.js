import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PlayCard } from "../components/";

function Home() {
  return (
    <Container>
      <Row>
        <Col>
          <PlayCard />
        </Col>
      </Row>
    </Container>
  );
}

export { Home };

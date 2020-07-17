import React, { useContext } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { PlayerCard, UnitCard } from "../components";

function GamePane() {
  return (
    <Container fluid style={{ margin: "10px" }}>
      <Row>
        <Col style={{ borderRight: "1px solid #eee" }}>
          <PlayerCard player="p1" />
          <UnitCard player="P1" />
        </Col>
        <Col>
          <PlayerCard player="p2" />
          <UnitCard player="P2" />
        </Col>
      </Row>
    </Container>
  );
}

export { GamePane };

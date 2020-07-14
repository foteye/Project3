import React, { useContext } from "react";
import { DiceRoller } from "../components";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Dice() {
  return (
    <Container style={{ marginTop: "20px" }}>
      <Row>
        <Col>
          <DiceRoller></DiceRoller>
        </Col>
      </Row>
    </Container>
  );
}

export { Dice };

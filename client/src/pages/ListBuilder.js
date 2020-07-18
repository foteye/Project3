import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { UnitSelector, SelectedUnits } from "../components";

function ListBuilder() {
  return (
    <Container fluid style={{ margin: "20px" }}>
      <Row>
        <Col xs="9">
          <UnitSelector />
        </Col>
        <Col xs="3">
          <SelectedUnits />
        </Col>
      </Row>
    </Container>
  );
}

export { ListBuilder };

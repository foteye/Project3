import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";

function UnitSelector() {
  return (
    <Tab.Container>
      <Row>
        <Col xs="4">
          <ListGroup>
            <ListGroup.Item action href="#link1">
              Link 1
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              Link 2
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs="8">
          <Tab.Content>
            <Tab.Pane eventKey="#link1">Text 1</Tab.Pane>
            <Tab.Pane eventKey="#link2">Text 2npm</Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export { UnitSelector };

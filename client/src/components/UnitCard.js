import React, { useState, useContext, useEffect } from "react";

import { Card, ListGroup } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { GameContext } from "../context/gameContext";
import { ActiveUnitContext } from "../context/activeUnitContext";

function UnitCard() {
  const { activeUnitState, setActiveUnitState } = useContext(ActiveUnitContext);

  return (
    <Card style={{ marginTop: "15px" }}>
      <Card.Header>Selected Unit</Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <b>Name:</b> {activeUnitState.name}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Model:</b> {activeUnitState.model}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Total Points:</b> {activeUnitState.totalPoints}
          </ListGroup.Item>
          <ListGroup.Item>
            <b>Model Count:</b> {activeUnitState.modelCount}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export { UnitCard };

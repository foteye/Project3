import React, { useState, useContext, useEffect } from "react";

import { Card, ListGroup } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { GameContext } from "../context/gameContext";
import { ActiveUnitContext } from "../context/activeUnitContext";

function UnitCard({ player }) {
  const { activeUnitState, setActiveUnitState } = useContext(ActiveUnitContext);
  const { gameState, setGameState } = useContext(GameContext);
  const activeUnitPlayer = "activeUnit" + player;

  useEffect(() => {}, [activeUnitState]);

  //   const decrease = (type) => {
  //     if (unitState[type] <= 0) {
  //       return;
  //     }
  //     setUnitState({ ...unitState, [type]: unitState[type] - 1 });
  //   };

  //   const increase = (type) => {
  //     setUnitState({ ...unitState, [type]: unitState[type] + 1 });
  //   };

  return (
    <Card style={{ marginTop: "15px" }}>
      <Card.Header>Selected Unit</Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Name: {activeUnitState[activeUnitPlayer].name}
          </ListGroup.Item>
          <ListGroup.Item>
            Model: {activeUnitState[activeUnitPlayer].model}
          </ListGroup.Item>
          <ListGroup.Item>
            Total Points: {activeUnitState[activeUnitPlayer].totalPoints}
          </ListGroup.Item>
          <ListGroup.Item>
            Model Count: {activeUnitState[activeUnitPlayer].modelCount}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export { UnitCard };

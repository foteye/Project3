import React, { useState, useContext, useEffect } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { ArmyListView, PlayerCard, UnitCard } from "../components";

import { GameContext } from "../context/gameContext";
import ActiveUnitContextProvider from "../context/activeUnitContext";

function Game() {
  const { gameState, setGameState } = useContext(GameContext);
  useEffect(() => {
    const getFactions = async () => {
      const p1faction = await getFaction(gameState.p1list);
      const p2faction = await getFaction(gameState.p2list);
      setGameState({ ...gameState, p1faction, p2faction });
    };
    getFactions();
  }, [gameState.p1faction, gameState.p2faction]);

  const getFaction = async (listId, player) => {
    if (!listId) {
      return "";
    }
    try {
      const listResponse = await fetch("/api/lists/find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          field: "id",
          value: listId,
        }),
      });
      const result = await listResponse.json();
      if (listResponse.ok) {
        return result[0].faction;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container fluid style={{ margin: "20px" }}>
      <Row>
        <ActiveUnitContextProvider>
          <Col>
            <ArmyListView listId={gameState.p1list} player="P1" />
          </Col>
          <Col style={{ borderRight: "1px solid #eee", margin: "10px" }} xs={4}>
            <PlayerCard player="p1" />
            <UnitCard player="P1" />
          </Col>
        </ActiveUnitContextProvider>
        <ActiveUnitContextProvider>
          <Col xs={4}>
            <PlayerCard player="p2" />
            <UnitCard player="P2" />
          </Col>

          <Col>
            <ArmyListView listId={gameState.p2list} player="P2" />
          </Col>
        </ActiveUnitContextProvider>
      </Row>
    </Container>
  );
}

export { Game };

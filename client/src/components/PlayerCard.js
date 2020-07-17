import React, { useState, useContext, useEffect } from "react";

import { Card, InputGroup, FormControl, Button } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { GameContext } from "../context/gameContext";

function PlayerCard({ player }) {
  const [playerState, setPlayerState] = useState({ cp: 3, vp: 0 });
  const { gameState, setGameState } = useContext(GameContext);
  const nameLabel = player + "name";

  const decrease = (type) => {
    if (playerState[type] <= 0) {
      return;
    }
    setPlayerState({ ...playerState, [type]: playerState[type] - 1 });
  };

  const increase = (type) => {
    setPlayerState({ ...playerState, [type]: playerState[type] + 1 });
  };

  return (
    <Card>
      <Card.Header>
        {gameState[nameLabel]} -{" "}
        {typeof gameState[player + "faction"] === "string" &&
          gameState[player + "faction"]}
      </Card.Header>
      <Card.Body>
        <InputGroup>
          <InputGroup.Prepend>
            <span style={{ marginRight: "10px" }}>Command Points:</span>
            <Button
              onClick={() => decrease("cp")}
              className="btn btn-default btn-number"
            >
              <FaMinus />
            </Button>
          </InputGroup.Prepend>

          <FormControl
            name="quantity"
            readOnly={true}
            type="number"
            value={playerState.cp}
            style={{ maxWidth: "50px" }}
          />
          <InputGroup.Append>
            <Button
              onClick={() => increase("cp")}
              className="btn btn-default btn-number"
            >
              <FaPlus />
            </Button>
          </InputGroup.Append>
        </InputGroup>

        <InputGroup>
          <InputGroup.Prepend>
            <span style={{ marginRight: "34px" }}>Victory Points:</span>
            <Button
              onClick={() => decrease("vp")}
              className="btn btn-default btn-number"
            >
              <FaMinus />
            </Button>
          </InputGroup.Prepend>
          <FormControl
            name="quantity"
            readOnly={true}
            type="number"
            value={playerState.vp}
            style={{ maxWidth: "50px" }}
          />
          <InputGroup.Append>
            <Button
              onClick={() => increase("vp")}
              className="btn btn-default btn-number"
            >
              <FaPlus />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Card.Body>
    </Card>
  );
}

export { PlayerCard };

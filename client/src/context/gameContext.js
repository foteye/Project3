import React, { useState } from "react";

export const GameContext = React.createContext({});

export default (props) => {
  const [gameState, setGameState] = useState({});

  return (
    <GameContext.Provider value={{ gameState, setGameState }} {...props} />
  );
};

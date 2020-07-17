import React, { useState } from "react";

export const ActiveUnitContext = React.createContext({});

export default (props) => {
  const [activeUnitState, setActiveUnitState] = useState({
    activeUnitP1: {
      id: "",
      name: "",
      model: "",
      totalPoints: "",
      modelCount: "",
    },
    activeUnitP2: {
      id: "",
      name: "",
      model: "",
      totalPoints: "",
      modelCount: "",
    },
  });

  return (
    <ActiveUnitContext.Provider
      value={{ activeUnitState, setActiveUnitState }}
      {...props}
    />
  );
};

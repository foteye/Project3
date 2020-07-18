import React, { useState, useEffect, useContext } from "react";

import ListGroup from "react-bootstrap/ListGroup";

import { GameContext } from "../context/gameContext";
import { ActiveUnitContext } from "../context/activeUnitContext";

function ArmyListView({ listId }) {
  const { activeUnitState, setActiveUnitState } = useContext(ActiveUnitContext);
  const [unitList, setUnitList] = useState([]);

  // Load list units and populate list group items
  useEffect(() => {
    loadList();
  }, []);

  const renderUnit = async (unitId) => {
    try {
      const unitResponse = await fetch(`/api/units/find`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          field: "id",
          value: unitId,
        }),
      });

      const unitResult = await unitResponse.json();

      if (unitResponse.ok) {
        const unit = unitResult[0];
        const modelResponse = await fetch(`/api/models/find`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            field: "id",
            value: unit.modelType,
          }),
        });

        const modelResult = await modelResponse.json();
        if (modelResponse.ok) {
          const model = modelResult[0];
          setActiveUnitState({
            ...activeUnitState,
            id: unitId,
            name: unit.name,
            model: model.name,
            totalPoints: model.costPerModel * unit.modelCount,
            modelCount: unit.modelCount,
          });
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const loadList = async () => {
    const listResponse = await fetch(`/api/m2mlistunit/${listId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const results = await listResponse.json();

    const unitsToRender = results.map((unit) => {
      return (
        <ListGroup.Item
          key={unit.id}
          action
          onClick={() => renderUnit(unit.id)}
        >
          {unit.name}
        </ListGroup.Item>
      );
    });
    setUnitList(unitsToRender);
  };

  return <ListGroup variant="flush">{unitList}</ListGroup>;
}

export { ArmyListView };

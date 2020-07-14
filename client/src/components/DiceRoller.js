import React, { useState } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { DiceIcon } from "./DiceIcon";

import { FaPlus, FaMinus } from "react-icons/fa";

function DiceRoller() {
  const [formState, setFormState] = useState({ totalDice: 1 });
  const [listState, setListState] = useState({});

  const decrease = () => {
    if (formState.totalDice <= 1) {
      return;
    }
    setFormState({ totalDice: formState.totalDice - 1 });
  };

  const increase = () => {
    setFormState({ totalDice: formState.totalDice + 1 });
  };

  const diceRoll = (sides) => {
    const results = buildResultObject(sides);

    for (let i = 0; i < formState.totalDice; i++) {
      let result = Math.floor(
        Math.random() * Math.floor(parseInt(sides)) + 1
      ).toString();
      results[result] += 1;
    }
    console.log("Results:", results);
    buildDiceView(sides, results);
  };

  const buildResultObject = (sides) => {
    if (sides === 3) {
      return { "1": 0, "2": 0, "3": 0 };
    } else {
      return { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0 };
    }
  };

  const buildDiceView = (sides, results) => {
    const listView = [];

    for (let d = 1; d <= sides; d++) {
      let diceItems = [];
      for (let i = 0; i < results[d.toString()]; i++) {
        diceItems.push(
          <ListGroup.Item key={i} style={{ padding: "2px" }}>
            <DiceIcon d={d.toString()} />
          </ListGroup.Item>
        );
      }
      const diceRow = (
        <Container key={d}>
          <Row>
            <Col>
              <ListGroup horizontal>{diceItems}</ListGroup>
            </Col>
          </Row>
        </Container>
      );
      listView.push(diceRow);
    }

    setListState({ list: listView });
  };

  return (
    <Card>
      <Card.Header>Select the type and quantity of dice to roll!</Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col>
              <ButtonGroup vertical>
                <Button className="btn btn-default" onClick={() => diceRoll(3)}>
                  Roll D3
                </Button>
                <Button className="btn btn-default" onClick={() => diceRoll(6)}>
                  Roll D6
                </Button>
              </ButtonGroup>
            </Col>
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <Button
                    onClick={decrease}
                    className="btn btn-default btn-number"
                  >
                    <FaMinus />
                  </Button>
                </InputGroup.Prepend>

                <FormControl
                  name="quantity"
                  readOnly={true}
                  value={formState.totalDice}
                  type="number"
                />
                <InputGroup.Append>
                  <Button
                    onClick={increase}
                    className="btn btn-default btn-number"
                  >
                    <FaPlus />
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <hr />
        </Container>
        <Container>
          <Row>{listState.list}</Row>
        </Container>
      </Card.Body>
    </Card>
  );
}

export { DiceRoller };

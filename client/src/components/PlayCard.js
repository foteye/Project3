import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { GameContext } from "../context/gameContext";

export const PlayCard = withRouter(({ history }) => {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({
    code: null,
    message: null,
  });

  const { gameState, setGameState } = useContext(GameContext);

  const onInputChangeHandler = ({ target: { name, value } }) =>
    setFormState({ ...formState, [name]: value });

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log("here");
    try {
      if (true) {
        setGameState({ ...gameState, ...formState });
        console.log(history, "history");
        history.push("/game");
      } else {
        throw new Error("Invalid Username or Password");
      }
    } catch (err) {
      setErrors({
        message: "",
        code: "",
      });
    }
  };

  return (
    <Card style={{ marginTop: "30px" }}>
      <Card.Header>Play Game</Card.Header>
      <Card.Body>
        <Card.Title>Pick Armies</Card.Title>
        <Card.Text>Select army list and enter player names:</Card.Text>
        <Container>
          <Form onSubmit={onFormSubmit}>
            <Row>
              <Col>
                <Form.Group controlId="P1Name">
                  <Form.Label>Player 1 Name</Form.Label>
                  <Form.Control
                    name="p1name"
                    type="text"
                    required
                    onChange={onInputChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="P1List">
                  <Form.Label>Player 1 List</Form.Label>
                  <Form.Control
                    name="p1list"
                    type="text"
                    required
                    onChange={onInputChangeHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="P2Name">
                  <Form.Label>Player 2 Name</Form.Label>
                  <Form.Control
                    name="p2name"
                    type="text"
                    required
                    onChange={onInputChangeHandler}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="P1List">
                  <Form.Label>Player 2 List</Form.Label>
                  <Form.Control
                    name="p2list"
                    type="text"
                    required
                    onChange={onInputChangeHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button type="submit" variant="warning">
                  Start Game
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Card.Body>
    </Card>
  );
});

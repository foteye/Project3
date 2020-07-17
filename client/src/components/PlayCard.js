import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { GameContext } from "../context/gameContext";
import { UserContext } from "../context/userContext";

export const PlayCard = withRouter(({ history }) => {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({
    message: null,
  });
  const [listState, setListState] = useState([]);
  const { gameState, setGameState } = useContext(GameContext);
  const { userState, setUserState } = useContext(UserContext);

  useEffect(() => {
    loadLists();
  }, []);

  const onInputChangeHandler = ({ target: { name, value } }) =>
    setFormState({ ...formState, [name]: value });

  const loadLists = async () => {
    try {
      const listResponse = await fetch("/api/lists/find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          field: "user",
          value: userState.id,
        }),
      });

      const results = await listResponse.json();
      const listsToRender = results.map((result) => {
        return (
          <option key={result.id} value={result.id}>
            {result.name} ({result.maxPoints})
          </option>
        );
      });
      setListState(listsToRender);
    } catch (err) {
      setErrors({ message: err.toString() });
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const { p1list, p2list, p1name, p2name } = formState;
    try {
      if (!p1list || !p2list || p1list === "none" || p2list === "none") {
        setErrors({
          message: "Please ensure each player's list has been selected.",
        });
        return;
      }

      if (!p1name || !p2name) {
        setErrors({
          message: "Please ensure each player's name has been entered",
        });
        return;
      }

      setGameState({ ...gameState, ...formState });
      history.push("/game");
    } catch (err) {
      setErrors({
        message: err,
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
                    as="select"
                    required
                    onChange={onInputChangeHandler}
                  >
                    <option value="none">None</option>
                    {listState}
                  </Form.Control>
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
                <Form.Group controlId="P2List">
                  <Form.Label>Player 2 List</Form.Label>
                  <Form.Control
                    as="select"
                    name="p2list"
                    required
                    onChange={onInputChangeHandler}
                  >
                    <option value="none">None</option>
                    {listState}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                {
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {errors.message}
                  </p>
                }
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

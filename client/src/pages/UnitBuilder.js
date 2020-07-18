import React, { useState, useEffect } from "react";

import {
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  Card,
  FormControl,
} from "react-bootstrap";

function UnitBuilder() {
  const [modelList, setModelList] = useState([]);
  const [factionState, setFactionState] = useState([]);
  const [activeModel, setActiveModel] = useState({ name: "" });

  useEffect(() => {
    loadFactions();
  }, []);

  const loadFactions = async () => {
    try {
      const factionResponse = await fetch("/api/models", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (factionResponse.ok) {
        const result = await factionResponse.json();
        const uniqueFactions = [];
        result.forEach((model) => {
          if (!uniqueFactions.includes(model.faction)) {
            uniqueFactions.push(model.faction);
          }
        });
        setFactionState(uniqueFactions);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const loadFactionModels = async (factionId) => {
    try {
      const modelResponse = await fetch("/api/models/find", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          field: "faction",
          value: factionId,
        }),
      });
      if (modelResponse.ok) {
        setModelList(await modelResponse.json());
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const loadModelDetails = (model) => {
    console.log(model);
    setActiveModel(JSON.parse(model));
  };

  return (
    <Container fluid style={{ margin: "20px" }}>
      <Row>
        <Col xs="3">
          <Form>
            <Form.Control
              as="select"
              className="mr-sm-2"
              onChange={(e) => loadFactionModels(e.target.value)}
              style={{ marginBottom: "10px" }}
            >
              {factionState.map((faction) => (
                <option key={faction} value={faction}>
                  {faction}
                </option>
              ))}
            </Form.Control>
          </Form>
          <ListGroup>
            {modelList.map((model) => (
              <ListGroup.Item
                action
                key={model.id}
                value={JSON.stringify(model)}
                onClick={(e) => loadModelDetails(e.target.value)}
              >
                {model.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col xs="9">
          <Card>
            <Card.Header>{activeModel.name}</Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <b>Cost Per Model:</b> {activeModel.costPerModel}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Model Count: </b>{" "}
                  <FormControl placeholder={"Max: " + activeModel.unitLimit} />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Total Points:</b>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export { UnitBuilder };

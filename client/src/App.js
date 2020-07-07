import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import * as Pages from "./pages";
import { NavbarWarhammer, PrivateRoute } from "./components";

import UserContextProvider from "./context/userContext";
import GameContextProvider, { GameContext } from "./context/gameContext";

function App() {
  return (
    <UserContextProvider>
      <GameContextProvider>
        <Router>
          <Container fluid>
            <Row>
              <Col>
                <NavbarWarhammer />
              </Col>
            </Row>
            <Row>
              <Switch>
                <PrivateRoute exact path="/" component={Pages.Home} />
                <PrivateRoute exact path="/home" component={Pages.Home} />
                <Route exact path="/login" component={Pages.Login} />
                <Route exact path="/signup" component={Pages.Signup} />
                <PrivateRoute exact path="/builder" component={Pages.Builder} />
                <PrivateRoute exact path="/game" component={Pages.Game} />
              </Switch>
            </Row>
          </Container>
        </Router>
      </GameContextProvider>
    </UserContextProvider>
  );
}

export default App;

import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { UserContext } from "../context/userContext";

export const LoginCard = withRouter(({ history, location }) => {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState(null);

  const { userState, setUserState } = useContext(UserContext);

  const onInputChangeHandler = ({ target: { name, value } }) =>
    setFormState({ ...formState, [name]: value });

  const onFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const authResponse = await fetch("/api/users/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formState.email,
          password: formState.password,
        }),
      });

      if (await authResponse.json()) {
        setUserState({ ...userState, authenticated: true });
        if (location.state && location.state.from)
          history.replace(location.state.from);
        else history.push("/");
      } else {
        throw new Error("Invalid Username or Password");
      }
    } catch (err) {
      setErrors(err.message);
    }
  };

  // If user is already logged in, take them back to home
  if (userState.authenticated === true) {
    history.push("/");
  }

  return (
    <Card style={{ marginTop: "30px" }}>
      <Card.Header>
        Please enter your username and password, or if you're new, click Signup!
      </Card.Header>
      <Card.Body>
        <Form onSubmit={onFormSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              required
              onChange={onInputChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              required
              onChange={onInputChangeHandler}
            />
          </Form.Group>
          {errors && <p style={{ color: "red", fontSize: "12px" }}>{errors}</p>}
          <Button
            type="submit"
            variant="primary"
            style={{ marginRight: "10px" }}
          >
            Login
          </Button>
          <Button href="/signup" variant="warning">
            Signup
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
});

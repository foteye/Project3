import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { UserContext } from "../context/userContext";

export const LoginCard = withRouter(({ history }) => {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({
    message: null,
  });

  const { userState, setUserState } = useContext(UserContext);

  // If user is already logged in, take them back to home
  useEffect(() => {
    if (userState.authenticated === true) {
      history.push("/");
    }
  }, []);

  const onInputChangeHandler = ({ target: { name, value } }) =>
    setFormState({ ...formState, [name]: value });

  const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formState;

    if (!validateEmail(email)) {
      setErrors({ message: "Please enter a valid email" });
      return;
    }

    try {
      const authResponse = await fetch("/api/users/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const result = await authResponse.json();
      if (authResponse.ok && result.authenticated) {
        setUserState({
          ...userState,
          firstName: result.firstName,
          id: result.id,
          authenticated: true,
        });
        history.push("/home");
      } else {
        setErrors({ message: result.message });
      }
    } catch (err) {
      setErrors({ message: err.message });
    }
  };

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
          {<p style={{ color: "red", fontSize: "12px" }}>{errors.message}</p>}
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

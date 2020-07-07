import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { UserContext } from "../context/userContext";

export const SignupCard = withRouter(({ history, location }) => {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({
    code: null,
    message: null,
  });

  const { userState, setUserState } = useContext(UserContext);

  const onInputChangeHandler = ({ target: { name, value } }) =>
    setFormState({ ...formState, [name]: value });

  const onFormSubmit = (e) => {
    e.preventDefault();

    try {
      //await POST("/api/something", { method: "POST" });
      //send user off to API and await favorable response
      if (formState.password === formState.confirmPassword) {
        setUserState({ ...userState, ...formState, authenticated: true });
        history.push("/home");
      } else {
        throw new Error("Invalid Username or Password");
      }
    } catch (err) {
      setErrors({
        message: "Passwords must match",
        code: "badMatch",
      });
    }
  };

  return (
    <Card style={{ marginTop: "30px" }}>
      <Card.Header>
        Please fill in all details below to Sign Up! Yes they're all mandatory.
      </Card.Header>
      <Card.Body>
        <Form onSubmit={onFormSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              required
              onChange={onInputChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              required
              onChange={onInputChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="email@domain.com"
              name="email"
              required
              onChange={onInputChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              required
              onChange={onInputChangeHandler}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              required
              onChange={onInputChangeHandler}
            />
          </Form.Group>
          {errors.code === "badMatch" && (
            <p style={{ color: "red", fontSize: "12px" }}>{errors.message}</p>
          )}
          <Button
            type="submit"
            variant="primary"
            style={{ marginRight: "10px" }}
          >
            Submit
          </Button>
          <Button href="/login" variant="warning">
            Already have Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
});

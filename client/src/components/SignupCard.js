import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { UserContext } from "../context/userContext";

export const SignupCard = withRouter(({ history, location }) => {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({
    message: null,
  });

  const { userState, setUserState } = useContext(UserContext);

  const onInputChangeHandler = ({ target: { name, value } }) =>
    setFormState({ ...formState, [name]: value });

  const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password, firstName, lastName, confirmPassword } = formState;

    if (!validateEmail(email)) {
      setErrors({ message: "Please enter a valid email" });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ message: "Passwords must match" });
      return;
    }

    if (password.length < 8) {
      setErrors({ message: "Password must be at least 8 characters long" });
      return;
    }

    try {
      const signupResponse = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      });
      const result = await signupResponse.json();
      if (signupResponse.ok) {
        setUserState({
          ...userState,
          ...result,
          authenticated: true,
          password: "",
        });
        history.push("/home");
      } else {
        setErrors({ message: result.message });
      }
    } catch (err) {
      setErrors({ message: err });
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
          {<p style={{ color: "red", fontSize: "12px" }}>{errors.message}</p>}
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

import React, { useContext } from "react";
import { withRouter } from "react-router-dom";

import { Navbar, Nav, Button } from "react-bootstrap";

import { UserContext } from "../context/userContext";

import Logo from "../img/warhammerlogo.png";

export const NavbarWarhammer = withRouter(({ history }) => {
  const {
    userState: { authenticated },
  } = useContext(UserContext);

  const { userState, setUserState } = useContext(UserContext);

  const logout = () => {
    setUserState({ ...userState, authenticated: false });
    history.push("/login");
  };

  const home = () => {
    history.push("/home");
  };

  const builder = () => {
    history.push("/builder");
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand onClick={home}>
        <img
          src={Logo}
          width="180"
          height="45"
          className="d-inline-block align-top"
          alt="Logo"
          style={{ marginRight: "15px" }}
        />
        <span style={{ verticalAlign: "sub" }}>Warhammer 40k Game Tracker</span>
      </Navbar.Brand>
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Nav.Link onClick={builder}>Army Builder</Nav.Link>
        </Nav>
        {authenticated && (
          <Button onClick={logout} variant="warning">
            Logout
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
});

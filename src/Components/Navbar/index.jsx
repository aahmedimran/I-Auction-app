import React from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router";
import Modeswitch from "../../helper/mode-switch";

const Bar = () => {
  const navigate = useNavigate();

  const User = localStorage.getItem("User");

  const logoutHandler = () => {
    localStorage.removeItem("User");
    if (!User) {
      navigate("/Login");
    }
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
      <Modeswitch />
        <LinkContainer to="">
          <Navbar.Brand>I-Auction app</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {User && (
              <>
                <LinkContainer to="/Home">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/Biddies">
                  <Nav.Link>Biddies</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/Conformbiddes">
                  <Nav.Link>ConformBiddes</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/">
                  <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                </LinkContainer>
              </>
            )}
            {!User && (
              <>
                <LinkContainer to="/">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/Rigister">
                  <Nav.Link>Rigister</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Bar;

import React from "react";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";

const Bar = () => {
  const User = localStorage.getItem("User");
  console.log("🚀 ~ file: index.jsx:9 ~ Bar ~ User", User);
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/Home">
          <Navbar.Brand>I-Auction app</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {User  && (
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
                <LinkContainer to="/" >

                  <Nav.Link onClick={()=>( localStorage.removeItem('User'))}>Logout
                 
                  </Nav.Link>
                </LinkContainer>
              </>
            )} 
            {!User  &&  (
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

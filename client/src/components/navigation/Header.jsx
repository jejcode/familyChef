import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import chefIcon from "../../assets/chef.png"

const Header = () => {
  return (
    <Navbar collapseOnSelect expand="md" bg="success" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="/dashboard">
          <img src={chefIcon} alt="chef hat"/>{' '}
          Family Chef</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
            <Nav.Link href="/chef/recipes/all">Recipes</Nav.Link>
            <Nav.Link href="/chef/shoppinglist">Shopping list</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;

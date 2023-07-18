import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import MenuForm from "../components/menus/MenuForm";

const NewMenu = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Create New Menu</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <MenuForm editForm={false} />
        </Col>
      </Row>
    </Container>
  );
};

export default NewMenu;

import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import MenuForm from "../components/menus/MenuForm";

const EditMenu = () => {
  return (
    <Container>
      <Row className="m-2">
        <Col>
          <h1>Edit Menu</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <MenuForm editForm={true} />
        </Col>
      </Row>
    </Container>
  );
};

export default EditMenu;

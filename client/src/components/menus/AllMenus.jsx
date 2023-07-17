import React from "react";
import ViewAllMenus from "./ViewAllMenus";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PageLinks from "../navigation/PageLinks"


const AllMenus = () => {
  return (
    <Container className="mt-2">
      <Row className="justify-content-between">
        <Col>
          <h2>All Menus</h2>
        </Col>
        <Col>
          <PageLinks />
        </Col>
      </Row>
      <Row>
        <Col>
          <ViewAllMenus showAllMenus={true}/>
        </Col>
      </Row>
    </Container>
  );
};
export default AllMenus;

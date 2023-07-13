import React from "react";
import RecipeForm from "../components/recipes/RecipeForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const NewRecipe = () => {
  return (
    <Container>
      <Row className="mt-2 justify-content-center">
        <Col sx="auto" sm="auto" md="auto" lg="auto">
          <h2>Create a new recipe</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <RecipeForm editRecipe={false}/>
        </Col>
      </Row>
    </Container>
  );
};

export default NewRecipe;

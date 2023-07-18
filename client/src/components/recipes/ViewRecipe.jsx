import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipeById } from "../../services/recipe-service";
import Container from "react-bootstrap/Container";
import PageLinks from "../navigation/PageLinks";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BsFillPencilFill} from "react-icons/bs"

const ViewRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const oneRecipe = await getRecipeById(id);
        setRecipe(oneRecipe);
        setLoaded(true);
        console.log(oneRecipe);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Container className="mt-2 ">
      {loaded && (
        <>
          <Row className="justify-content-between">
            <Col >
              <h2>{recipe.title}</h2>
            </Col>
            <Col>
              <PageLinks addLinks={[{href: `/chef/recipes/${recipe._id}/edit`, text: 'Edit'}]}/>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>Serving size: {recipe.servings}</Col>
            <Col>Prep time: {recipe.prepTime}</Col>
          </Row>
          <Row>
            <Col>
              <p>{recipe.description}</p>
            </Col>
          </Row>
          <Row>
            <Col xs="12" sm="12" md="6" lg="6">
              <h3>Ingredients:</h3>
              {recipe.ingredients.map((ingredient, index) => {
                return (
                  <p key={index}>
                    {ingredient.amount} {ingredient.measurement}{" "}
                    {ingredient.item}
                  </p>
                );
              })}
            </Col>
            <Col xs="12" sm="12" md="6" lg="6">
              <h3>Directions:</h3>
              <p>{recipe.directions}</p>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ViewRecipe;

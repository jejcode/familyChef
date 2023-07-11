import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllRecipes } from "../services/recipe-service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const AllRecipes = () => {
  const [loaded, setLoaded] = useState(false);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const recipes = await getAllRecipes();
        setAllRecipes(recipes);
        setLoaded(true);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <Container className="mt-2">
      <Row>
        <Col>
          <h2>All Recipes</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {allRecipes.map((recipe, index) => {
            return (
              <Row key={index} className="mb-1 align-items-center">
                <Col>
                  <Link to={`/chef/recipes/${recipe._id}/view`}>{recipe.title}</Link>
                </Col>
                <Col>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-circle"
                  >
                    +
                  </Button>
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};
export default AllRecipes;

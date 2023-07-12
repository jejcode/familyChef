import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import RecipeForm from "./RecipeForm";
import { getRecipeById } from "../../services/recipe-service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const EditRecipe = () => {
  const {id} = useParams()
  const [currentRecipe, setCurrentRecipe] = useState({})
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    (async () => {
      try{
        const recipeToEdit = await getRecipeById(id)
        setCurrentRecipe(recipeToEdit)
        setLoaded(true)

      } catch (err) {
        console.log(err)
      }
    })()
    console.log(currentRecipe)
  }, [])
  return (
    <Container>
    {loaded &&
      <>
        <Row className="mt-2 justify-content-center">
          <Col sx="auto" sm="auto" md="auto" lg="auto">
            <h2>Edit {currentRecipe.title}</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <RecipeForm editRecipe={currentRecipe}/>
          </Col>
        </Row>
      </>
    }
    </Container>
  );
};

export default EditRecipe;

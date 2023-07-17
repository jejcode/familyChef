import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import RecipeForm from "../components/recipes/RecipeForm";
import { getRecipeById, deleteRecipeById } from "../services/recipe-service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsFillTrashFill } from "react-icons/bs";

const EditRecipe = () => {
  const { id } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate()

  const deleteRecipe = async (recipeId) => {
    const deletedRecipe = await deleteRecipeById(recipeId)
    console.log(deletedRecipe)
    navigate('/chef/recipes/all')
  }
  useEffect(() => {
    (async () => {
      try {
        const recipeToEdit = await getRecipeById(id);
        setCurrentRecipe(recipeToEdit);
        setLoaded(true);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <Container>
      {loaded && (
        <>
          <Row className="mt-2 justify-content-center">
            <Col sx="auto" sm="auto" md="auto" lg="auto">
              <h2>Edit {currentRecipe.title}</h2>
            </Col>
            <Col sx="auto" sm="auto" md="auto" lg="auto">
              <BsFillTrashFill onClick={() => deleteRecipe(currentRecipe._id)}/>
            </Col>
          </Row>
          <Row>
            <Col>
              <RecipeForm editRecipe={currentRecipe} />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default EditRecipe;

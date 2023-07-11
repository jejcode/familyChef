import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipe-service";
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ViewRecipe = () => {
  const {id} = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    (async ()=> {
      try{
        const oneRecipe = await getRecipeById(id)
        setRecipe(oneRecipe)
        setLoaded(true)
        console.log(oneRecipe)
      } catch(err){console.log(err)}
    })()
  }, [])

  return (
    <Container className="mt-2 ">
      {loaded &&
      <>
        <h2 className="d-flex justify-content-center">{recipe.title}</h2>
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
          <Col>
            <h3>Ingredients:</h3>
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <p key={index}>{ingredient.amount} {ingredient.measurement} {ingredient.item}</p>
              )
            })}
          </Col>
          <Col>
            <h3>Directions:</h3>
            <p>{recipe.directions}</p>
          </Col>
        </Row>
      </>
      }
    </Container>
  )
}

export default ViewRecipe
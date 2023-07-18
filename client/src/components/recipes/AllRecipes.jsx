import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllRecipes } from "../../services/recipe-service";
import DeleteRecipeModal from "../modals/DeleteRecipeModal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table"
import PageLinks from "../navigation/PageLinks"
import editIcon from "../../assets/writing.png"

const AllRecipes = () => {
  const [loaded, setLoaded] = useState(false);
  const [allRecipes, setAllRecipes] = useState([]);
  const [deletedRecipe, setDeletedRecipe] = useState('')
  const navigate=useNavigate()

  const editRecipe = (recipeId) => {
    navigate(`/chef/recipes/${recipeId}/edit`)
  }
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
        <Col>
          <PageLinks addLinks={[{href: `/chef/recipes/new`, text: 'New'}]}/>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>Recipe</th>
            <th>Servings</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {console.log(allRecipes)}
          {allRecipes.map((recipe, index) => {
            return (
              <tr key={index}>
                <td>
                  <Link className="text-success" to={`/chef/recipes/${recipe._id}/view`}>{recipe.title}</Link>
                </td>
                <td>{recipe.servings}</td>
                <td>{recipe.prepTime}</td>
                <td>
                  <img className="changePointer me-4" src={editIcon} alt="edit pencil" width="25" onClick={() => editRecipe(recipe._id)}></img>
                  <DeleteRecipeModal recipeId={recipe._id} setAllRecipes={setAllRecipes} allRecipes={allRecipes}/>
                  </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      {/* <Row>
        <Col>
          {allRecipes.map((recipe, index) => {
            return (
              <Row key={index} className="mb-1 align-items-center">
                <Col>
                  <Link to={`/chef/recipes/${recipe._id}/view`}>
                    {recipe.title}
                  </Link>
                </Col>
                <Col>
                  <BsJournalPlus />
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row> */}
    </Container>
  );
};
export default AllRecipes;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { BsXLg } from "react-icons/bs";
import { getAllRecipes, updateAllRecipesOnMenu } from "../../services/recipe-service";
import { createMenu } from "../../services/menu-service";

const MenuForm = () => {
  const [menuDate, setMenuDate] = useState("");
  const [menuDateError, setMenuDateError] = useState("Date is required");
  const [menuNotes, setMenuNotes] = useState("");
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();
  const handleDateChange = (e) => {
    if (!e.target.value) {
      setMenuDateError("Date is required");
    } else {
      setMenuDateError("");
    }
    setMenuDate(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);

    const filterByKeyword = (recipe) => {
      const keyword = filterValue.toLowerCase();
      if (
        recipe.title.toLowerCase().includes(keyword) ||
        recipe.description.toLowerCase().includes(keyword)
      )
        return true;
      const filteredIngredients = recipe.ingredients.filter((o) =>
        o.item.toLowerCase().includes(keyword)
      );
      if (filteredIngredients.length > 0) return true;
      return false;
    };
    setFilteredRecipes(allRecipes.filter(filterByKeyword));
  };

  const addRecipeToMenu = (recipeId) => {
    setSelectedRecipes([...selectedRecipes, recipeId]);
  };

  const deleteRecipeFromMenu = (recipeIndex) => {
    setSelectedRecipes((prevSelectedRecipes) =>
      prevSelectedRecipes.reduce((arr, recipe, index) => {
        if (index != recipeIndex) arr.push(recipe);
        return arr;
      }, [])
    );
  };
  useEffect(() => {
    (async () => {
      try {
        const listOfRecipes = await getAllRecipes();
        setAllRecipes(listOfRecipes);
        setLoaded(true);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const recipeIds = selectedRecipes.map((recipe) => recipe._id);
    try {
      const newMenu = await createMenu({
        date: menuDate,
        items: recipeIds,
        notes: menuNotes,
      });
      const recipesWithMenu = await updateAllRecipesOnMenu({recipeIds, menuId: newMenu._id})
      navigate("/chef/menus/all");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container className="m-2">
      {loaded && (
        <>
          <Form onSubmit={(e) => onSubmitHandler(e)}>
            <Form.Group as={Row} className="align-items-end mb-2">
              <Col xs="auto" lg="auto">
                <Form.Label>
                  Date: <span className="text-danger">{menuDateError}</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => handleDateChange(e)}
                  value={menuDate}
                />
              </Col>
              <Col>
                <Form.Label>Notes:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setMenuNotes(e.target.value)}
                  value={menuNotes}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="align-items-end">
              <Col className="overflow-auto">
                {selectedRecipes.length === 0 ? (
                  <p className="text-danger">No recipes selected.</p>
                ) : (
                  <div>
                    {selectedRecipes.map((recipe, index) => {
                      return (
                        <div key={index}>
                          {recipe.title}{" "}
                          <BsXLg onClick={() => deleteRecipeFromMenu(index)} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </Col>
              <Col>
                <Button type="submit">Save</Button>
              </Col>
            </Form.Group>
          </Form>
          <Row className="my-3">
            <Col>
              <Form.Control
                type="text"
                onChange={(e) => handleFilterChange(e)}
                value={filterValue}
                placeholder="Type a search term to filter recipes"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Click on a recipe below to add it to the menu:</h4>
              {filterValue ? (
                <div className="d-grid">
                  {filteredRecipes.map((recipe, index) => {
                    return (
                      <Button
                        key={index}
                        className="mb-2"
                        onClick={() => addRecipeToMenu(recipe)}
                      >
                        {recipe.title}
                      </Button>
                    );
                  })}
                </div>
              ) : (
                <div className="d-grid">
                  {allRecipes.map((recipe, index) => {
                    return (
                      <Button
                        key={index}
                        className="mb-2"
                        onClick={() => addRecipeToMenu(recipe)}
                      >
                        {recipe.title}
                      </Button>
                    );
                  })}
                </div>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default MenuForm;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import xMark from "../../assets/x-mark.png";
import { getAllRecipes } from "../../services/recipe-service";
import {
  createMenu,
  getMenuById,
  updateMenuById,
} from "../../services/menu-service";

const MenuForm = (props) => {
  const { editForm } = props;
  const { id } = useParams();
  const [editMenuId, setEditMenuId] = useState("");
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

        if (editForm) {
          const thisMenu = await getMenuById(id);
          setEditMenuId(thisMenu._id);
          setMenuDate(thisMenu.date.slice(0, 10));
          setMenuDateError("");
          setMenuNotes(thisMenu.notes);
          setSelectedRecipes(thisMenu.recipes);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  const cancelForm = () => {
    navigate("/chef/menus/all");
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const recipeIds = selectedRecipes.map((recipe) => recipe._id);
    const menuData = {
      date: menuDate,
      recipes: recipeIds,
      notes: menuNotes,
    };
    try {
      if (editForm) {
        const updateMenu = await updateMenuById(editMenuId, menuData);
        navigate(`chef/menus/${editMenuId}/view`);
      } else {
        const newMenu = await createMenu(menuData);
      }
      navigate("/chef/menus/all");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container className="m-2">
      {loaded && (
        <>
          <Form
            onSubmit={(e) => onSubmitHandler(e)}
            className="p-4 border bg-light"
          >
            <Form.Group as={Row} className="align-items-end mb-2">
              <Col xs="12" sm="12" md="4" lg="4">
                <Form.Label>
                  Date: <span className="text-danger">{menuDateError}</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => handleDateChange(e)}
                  value={menuDate}
                />
              </Col>
              <Col xs="12" sm="12" md="8" lg="8">
                <Form.Label>Notes:</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setMenuNotes(e.target.value)}
                  value={menuNotes}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-4">
              <Col className="overflow-auto">
                {selectedRecipes.length === 0 ? (
                  <p className="text-danger">No recipes selected.</p>
                ) : (
                  <div>
                    {selectedRecipes.map((recipe, index) => {
                      return (
                        <div
                          key={index}
                          className="mb-2 p-2 border d-flex justify-content-between deleteHover"
                        >
                          {recipe.title}
                          <img
                            className="changePointer ms-4"
                            src={xMark}
                            width="25"
                            onClick={() => deleteRecipeFromMenu(index)}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </Col>
            </Form.Group>
            <div className=" d-flex justify-content-center">
              <Button variant="light" className="me-4" onClick={cancelForm}>
                Cancel
              </Button>
              <Button type="submit" variant="success">
                Save
              </Button>
            </div>
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
                        variant="outline-success"
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
                        variant="outline-success"
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

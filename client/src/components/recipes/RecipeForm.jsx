import React, { useReducer, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { BsXLg } from "react-icons/bs";

import { createRecipe, updateRecipe } from "../../services/recipe-service";

const intialState = {
  title: {
    value: "",
    error: "",
  },
  description: {
    value: "",
    error: "",
  },
  servings: {
    value: "",
    error: "",
  },
  prepTime: {
    value: "",
    error: "",
  },
  ingredients: {
    value: "",
    error: "",
  },
  directions: {
    value: "",
    error: "",
  },
  amount: {
    value: "",
    error: "",
  },
  measurement: {
    value: "",
    error: "",
  },
  item: {
    value: "",
    error: "",
  },
};

const reducer = (state, action) => {
  const options = {
    SET_TITLE_VALUE: () => {
      return {
        ...state,
        title: {
          ...state.title,
          value: action.payload,
        },
      };
    },
    SET_TITLE_ERROR: () => {
      return {
        ...state,
        title: {
          ...state.title,
          error: action.payload,
        },
      };
    },
    SET_DESCRIPTION_VALUE: () => {
      return {
        ...state,
        description: {
          ...state.description,
          value: action.payload,
        },
      };
    },
    SET_DESCRIPTION_ERROR: () => {
      return {
        ...state,
        description: {
          ...state.description,
          error: action.payload,
        },
      };
    },
    SET_SERVINGS_VALUE: () => {
      return {
        ...state,
        servings: {
          ...state.servings,
          value: action.payload,
        },
      };
    },
    SET_SERVINGS_ERROR: () => {
      return {
        ...state,
        servings: {
          ...state.servings,
          error: action.payload,
        },
      };
    },
    SET_PREPTIME_VALUE: () => {
      return {
        ...state,
        prepTime: {
          ...state.prepTime,
          value: action.payload,
        },
      };
    },
    SET_PREPTIME_ERROR: () => {
      return {
        ...state,
        prepTime: {
          ...state.prepTime,
          error: action.payload,
        },
      };
    },
    SET_INGREDIENTS_VALUE: () => {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          value: action.payload,
        },
      };
    },
    SET_INGREDIENTS_ERROR: () => {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          error: action.payload,
        },
      };
    },
    SET_DIRECTIONS_VALUE: () => {
      return {
        ...state,
        directions: {
          ...state.directions,
          value: action.payload,
        },
      };
    },
    SET_DIRECTIONS_ERROR: () => {
      return {
        ...state,
        directions: {
          ...state.directions,
          error: action.payload,
        },
      };
    },
    SET_AMOUNT_VALUE: () => {
      return {
        ...state,
        amount: {
          ...state.amount,
          value: action.payload,
        },
      };
    },
    SET_AMOUNT_ERROR: () => {
      return {
        ...state,
        amount: {
          ...state.amount,
          error: action.payload,
        },
      };
    },
    SET_MEASUREMENT_VALUE: () => {
      return {
        ...state,
        measurement: {
          ...state.measurement,
          value: action.payload,
        },
      };
    },
    SET_MEASUREMENT_ERROR: () => {
      return {
        ...state,
        measurement: {
          ...state.measurement,
          error: action.payload,
        },
      };
    },
    SET_ITEM_VALUE: () => {
      return {
        ...state,
        item: {
          ...state.item,
          value: action.payload,
        },
      };
    },
    SET_ITEM_ERROR: () => {
      return {
        ...state,
        item: {
          ...state.item,
          error: action.payload,
        },
      };
    },
    default: () => {
      return state;
    },
  };

  return options[action.type]() || options.default();
};

const RecipeForm = (props) => {
  const { editRecipe } = props;
  const inputRef = useRef(null)
  const navigate = useNavigate();

  if (editRecipe) {
    for (const objectKey in intialState) {
      if (intialState[objectKey]) {
        intialState[objectKey].value = editRecipe[objectKey] || "";
      }
    }
  }
  const [state, dispatch] = useReducer(reducer, intialState);

  const handleTitleChange = (e) => {
    if (e.target.value.length < 5) {
      dispatch({
        type: "SET_TITLE_ERROR",
        payload: "Title must have at least 5 characters",
      });
    } else {
      dispatch({
        type: "SET_TITLE_ERROR",
        payload: "",
      });
    }
    dispatch({
      type: "SET_TITLE_VALUE",
      payload: e.target.value,
    });
  };
  const handleDescriptionChange = (e) => {
    if (e.target.value.length < 5) {
      dispatch({
        type: "SET_DESCRIPTION_ERROR",
        payload: "Description must have at least 5 characters",
      });
    } else {
      dispatch({
        type: "SET_DESCRIPTION_ERROR",
        payload: "",
      });
    }
    dispatch({
      type: "SET_DESCRIPTION_VALUE",
      payload: e.target.value,
    });
  };
  const handleServingsChange = (e) => {
    if (e.target.value < 1) {
      dispatch({
        type: "SET_SERVINGS_ERROR",
        payload: "Servings must be at least 1",
      });
    } else {
      dispatch({
        type: "SET_SERVINGS_ERROR",
        payload: "",
      });
    }
    dispatch({
      type: "SET_SERVINGS_VALUE",
      payload: e.target.value,
    });
  };
  const handlePrepTimeChange = (e) => {
    if (e.target.value.length < 2) {
      dispatch({
        type: "SET_PREPTIME_ERROR",
        payload: "Prep time must be at least 2 characters",
      });
    } else {
      dispatch({
        type: "SET_PREPTIME_ERROR",
        payload: "",
      });
    }
    dispatch({
      type: "SET_PREPTIME_VALUE",
      payload: e.target.value,
    });
  };
  const handleAmountChange = (e) => {
    
    if (!e.target.value) {
      dispatch({
        type: "SET_AMOUNT_ERROR",
        payload: "Amount must be a number",
      });
    } else {
      dispatch({
        type: "SET_AMOUNT_ERROR",
        payload: "",
      });
    }
    dispatch({
      type: "SET_AMOUNT_VALUE",
      payload: e.target.value,
    });
  };
  const handleMeasurementChange = (e) => {
    if (!e.target.value) {
      dispatch({
        type: "SET_MEASUREMENT_VALUE",
        payload: "ea",
      });
    } else {
      dispatch({
        type: "SET_MEASUREMENT_VALUE",
        payload: e.target.value,
      });
    }
  };
  const handleItemChange = (e) => {
    if (e.target.value.length < 2) {
      dispatch({
        type: "SET_ITEM_ERROR",
        payload: "Item must be at least 2 characters",
      });
    } else {
      dispatch({
        type: "SET_ITEM_ERROR",
        payload: "",
      });
    }
    dispatch({
      type: "SET_ITEM_VALUE",
      payload: e.target.value,
    });
  };
  const addIngredientsToState = () => {
    if (typeof state.amount.value == "object") {
      dispatch({
        type: "SET_AMOUNT_ERROR",
        payload: "Amount must be at least one digit",
      });
      return;
    } else {
      dispatch({
        type: "SET_AMOUNT_ERROR",
        payload: "",
      });
    }
    if (typeof state.measurement.value == "object") {
      dispatch({
        type: "SET_MEASUREMENT_ERROR",
        payload: "Measurement must selected",
      });
      return;
    } else {
      dispatch({
        type: "SET_MEASUREMENT_ERROR",
        payload: "",
      });
    }
    if (state.item.value.length < 2) {
      dispatch({
        type: "SET_ITEM_ERROR",
        payload: "Item must be at least 2 characters",
      });
      return;
    } else {
      dispatch({
        type: "SET_ITEM_ERROR",
        payload: "",
      });
    }
    const ingredientData = {
      item: state.item.value,
      amount: state.amount.value,
      measurement: state.measurement.value,
    };
    dispatch({
      type: "SET_INGREDIENTS_VALUE",
      payload: [...state.ingredients.value, ingredientData],
    });
    dispatch({
      type: "SET_INGREDIENTS_ERROR",
      payload: "",
    });
    dispatch({
      type: "SET_AMOUNT_VALUE",
      payload: [""],
    });
    dispatch({
      type: "SET_MEASUREMENT_VALUE",
      payload: [""],
    });
    dispatch({
      type: "SET_ITEM_VALUE",
      payload: [""],
    });
    inputRef.current.focus()
  };
  const handleDirectionsChange = (e) => {
    if (e.target.value.length < 5) {
      dispatch({
        type: "SET_DIRECTIONS_ERROR",
        payload: "Directions must be at least 5 characters.",
      });
    } else {
      dispatch({
        type: "SET_DIRECTIONS_ERROR",
        payload: "",
      });
    }
    dispatch({
      type: "SET_DIRECTIONS_VALUE",
      payload: e.target.value,
    });
  };

  const removeIngredientFromList = (ingredientIndex) => {
    dispatch({
      type: "SET_INGREDIENTS_VALUE",
      payload: state.ingredients.value.reduce((arr, ingredient, index) => {
        if (ingredientIndex != index) {
          arr.push(ingredient);
        }
        return arr;
      }, []),
    });
    if(state.ingredients.value.length === 0) {
      dispatch({
        type: "SET_INGREDIENTS_ERROR",
        payload: "Requires at least one ingredient."
      })
    }
  };
  const cancelForm = () => {
    if (editRecipe) {
      navigate(`/chef/recipes/${editRecipe._id}/view`);
    } else {
      navigate("/chef/recipes/all");
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const recipeToSave = {
      title: state.title.value,
      description: state.description.value,
      servings: state.servings.value,
      prepTime: state.prepTime.value,
      ingredients: state.ingredients.value,
      directions: state.directions.value,
    };
    if (editRecipe) {
      try {
        const updatedRecipe = await updateRecipe(editRecipe._id, recipeToSave);
        if(updatedRecipe._id) navigate(`/chef/recipes/${updatedRecipe._id}/view`);
      } catch (err) {
        console.log('pre-if statement:', err.response.data)
        if (err.response && err.response.data) {
          const {errors} = err.response.data
          console.log('errors object', errors)
          if (errors.title) {
            dispatch({ type: "SET_TITLE_ERROR", payload: errors.title.message });
          }
          if (errors.description) {
            dispatch({ type: "SET_DESCRIPTION_ERROR", payload: errors.description.message });
          }
          if (errors.prepTime) {
            dispatch({ type: "SET_PREPTIME_ERROR", payload: errors.prepTime.message });
          }
          if (errors.servings) {
            dispatch({ type: "SET_SERVINGS_ERROR", payload: errors.servings.message });
          }
          if (errors.directions) {
            dispatch({ type: "SET_DIRECTIONS_ERROR", payload: errors.directions.message });
          }
          if (errors.ingredients) {
            dispatch({ type: "SET_INGREDIENTS_ERROR", payload: errors.ingredients.message });
          }
        }
      }
    } else {
      try {
        const newRecipe = await createRecipe(recipeToSave);
        if (newRecipe.status == 201) {
          navigate("/chef/recipes/all");
        }
      } catch (err) {
        console.log("Errors from back end", err);
      }
    }
  };
  return (
    <Form className="m-4" onSubmit={(e) => onSubmitHandler(e)}>
      <Form.Group className="mb-3">
        <Form.Label>
          Title:<span className="text-danger mx-1">{state.title.error}</span>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Type the recipe's title"
          id="title"
          value={state.title.value}
          onChange={(e) => handleTitleChange(e)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          Description:
          <span className="text-danger mx-1">{state.description.error}</span>
        </Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Type a short description. Include important keywords like breakfast or Instant Pot to easily find your recipe later."
          id="description"
          value={state.description.value}
          onChange={(e) => handleDescriptionChange(e)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Row>
          <Col xs="auto">
            <Form.Label>
              Servings:
              <span className="text-danger mx-1">{state.servings.error}</span>
            </Form.Label>
            <Form.Control
              type="number"
              id="servings"
              value={state.servings.value}
              onChange={(e) => handleServingsChange(e)}
            />
          </Col>
          <Col xs="auto">
            <Form.Label>
              Prep time:
              <span className="text-danger mx-1">{state.prepTime.error}</span>
            </Form.Label>
            <Form.Control
              type="text"
              id="prepTime"
              value={state.prepTime.value}
              onChange={(e) => handlePrepTimeChange(e)}
            />
          </Col>
        </Row>
      </Form.Group>
      <div id="addedIngredients" className="mb-3 p-2">
        {state.ingredients.error &&
          <div className="text-danger">{state.ingredients.error}</div>
        }
        
        {state.ingredients.value.length > 0 &&
          state.ingredients.value.map((ingredient, index) => {
            return (
              <Row key={index} className="align-items-center m-2 p-2">
                <Col xs="auto" lg={true} className="bg-light p-2">
                  <div>
                    {ingredient.amount} {ingredient.measurement}{" "}
                    {ingredient.item}
                  </div>
                </Col>
                <Col xs={1} sm={1} md={1} lg={1} className="bg-light p-2">
                  <BsXLg onClick={() => removeIngredientFromList(index)} />
                </Col>
              </Row>
            );
          })}
      </div>
      <Form.Group className="mb-3">
        <Row className="align-items-end">
          <Col xs="2">
            <Form.Label>Amnt.</Form.Label>
            <Form.Control
              ref={inputRef}
              type="text"
              size="sm"
              id="amount"
              value={state.amount.value}
              onChange={(e) => handleAmountChange(e)}
            />
          </Col>
          <Col xs="auto">
            <Form.Select
              aria-label="Measurment"
              id="measurement"
              value={state.measurement.value}
              onChange={(e) => handleMeasurementChange(e)}
            >
              <option>Meas.</option>
              <option value="Tbsp.">Tbsp</option>
              <option value="tsp.">tsp</option>
              <option value="c.">c</option>
              <option value="pt.">pt</option>
              <option value="qt.">qt</option>
              <option value="oz.">oz</option>
              <option value="fl. oz.">fl oz</option>
              <option value="gal.">gal</option>
              <option value="l.">l</option>
              <option value="mL.">mL</option>
              <option value="lb(s).">lb(s)</option>
              <option value="g.">g</option>
              <option value="kg.">kg</option>
              <option value="doz.">doz</option>
              <option value="ea.">ea</option>
            </Form.Select>
          </Col>
          <Col xs={4}>
            <Form.Label>Item</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              id="item"
              value={state.item.value}
              onChange={(e) => handleItemChange(e)}
            />
          </Col>
          <Col xs={1}>
            <Button
              type="button"
              className="rounded-circle"
              variant="success"
              onClick={addIngredientsToState}
            >
              +
            </Button>
          </Col>
        </Row>
        <div className="text-danger mx-1">{state.amount.error}</div>
        <div className="text-danger mx-1">{state.measurement.error}</div>
        <div className="text-danger mx-1">{state.item.error}</div>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Directions: <span className="text-danger">{state.directions.error}</span></Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Type in directions."
          style={{ height: "200px" }}
          id="directions"
          value={state.directions.value}
          onChange={(e) => handleDirectionsChange(e)}
        />
      </Form.Group>
      <Row className="d-flex justify-content-center">
        <Col xs="auto">
          <Button
            className="me-4"
            type="button"
            variant="danger"
            onClick={cancelForm}
          >
            Cancel
          </Button>
          <Button type="submit">{editRecipe ? "Save" : "Create"}</Button>
        </Col>
      </Row>
    </Form>
  );
};

export default RecipeForm;

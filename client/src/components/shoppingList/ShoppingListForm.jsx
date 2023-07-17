import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { getMenusByDateRange } from "../../services/menu-service";

const ShoppingListForm = (props) => {
  const {setAllIngredients} = props
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleDateChange = (value, selector) => {
    if (selector === "start") {
      setStart(value);
    }
    if (selector === "end") {
      setEnd(value);
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    (async () => {
      try {
        const menus = await getMenusByDateRange({ start, end: end || start});
        const ingredientList = []

        // following forEach sequence developed with the help of chat GPT
        menus.forEach(menu => {
          menu.recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
              const existingIngredientIndex = ingredientList.findIndex(
                (item) => item.item === ingredient.item
              )
              const convertStringToNum = (string) => {
                const trimmedString = string.trim()
                const parts = trimmedString.split(' ')
                let wholeNum = 0
                let fraction = 0
                let numerator = 0
                let denominator = 1
          
                if(parts.length === 2) {
                  [wholeNum, fraction] = parts
                } else {
                  [fraction] = parts
                }
                if(fraction.includes('/')) {
                  [numerator, denominator] = fraction.split('/')
                } else {
                  wholeNum = fraction
                }
                return parseFloat(wholeNum) + parseFloat(numerator / denominator)
              }
              ingredient.amount = convertStringToNum(ingredient.amount)
              if(existingIngredientIndex !== -1) {
                ingredientList[existingIngredientIndex].amount += ingredient.amount
              } else {
                ingredientList.push(ingredient)
              }
            })
          })
        });
        setAllIngredients(ingredientList)
        
      } catch (error) {
        console.log(error)
      }
    })();
  };
  return (
    <Form onSubmit={(e) => onSubmitHandler(e)}>
      <Form.Group>
        <h4>Enter date range:</h4>
        <Row>
          <Col xs="12" sm="12" md="auto" lg="auto" className="mb-2">
            <Form.Control
              type="date"
              onChange={(e) => handleDateChange(e.target.value, "start")}
              value={start}
            />
          </Col>
          <Col xs="12" sm="12" md="auto" lg="auto" className="mb-2">
            <Form.Control
              type="date"
              onChange={(e) => handleDateChange(e.target.value, "end")}
              value={end}
            />
          </Col>
          <Col>
            <Button type="submit" variant="success">
              Next
            </Button>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default ShoppingListForm;

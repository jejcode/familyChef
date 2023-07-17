import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BsXLg } from "react-icons/bs";
import xMark from "../../assets/x-mark.png"

const ShoppingListResults = (props) => {
  const {allIngredients, setAllIngredients} = props
  const removeFromList = (index) => {
    const newIngredientsList = allIngredients.reduce((arr, item, idx) => {
      if(index != idx) {
        arr.push(item)
      }
      return arr
    }, [])
    setAllIngredients(newIngredientsList)
  }
  return (
    <>
      {allIngredients.map((ingredient, index) => {
        return (
          <Row key={index} className="mb-2 align-items-center">
            <Col xs="auto" sm="auto" md="auto" lg="auto" className="bg-light p-4"> 
              <div>{ingredient.amount} {ingredient.measurement} {ingredient.item}</div>
            </Col>
            <Col xs="auto" sm="auto" md="auto" lg="auto" className="bg-light p-4">
              {/* <BsXLg  */}
              <img src={xMark} alt="x - delete" width="25" onClick ={() => removeFromList(index)}/>
            </Col>
          </Row>
        )
      })}
    </>
  )
}

export default ShoppingListResults
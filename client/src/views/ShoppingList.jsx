import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import ShoppingListForm from '../components/shoppingList/ShoppingListForm'
import ShoppingListResults from '../components/shoppingList/ShoppingListResults'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const ShoppingList = () => {
  const [allIngredients, setAllIngredients] = useState([])
  return (
    <Container className="mt-4">
      <Link to="/dashboard" className="d-flex justify-content-end">Home</Link>
      <Row>
        <Col>
          < ShoppingListForm setAllIngredients={setAllIngredients}/>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          < ShoppingListResults allIngredients={allIngredients} setAllIngredients={setAllIngredients}/>
        </Col>
      </Row>
    </Container>
  )
}

export default ShoppingList
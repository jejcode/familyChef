import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Accordian from "react-bootstrap/Accordion"
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { getMenuById } from "../../services/menu-service";
import PageLinks from "../navigation/PageLinks";

const ViewMenu = () => {
  const [menu, setMenu] = useState([])
  const [loaded, setLoaded] = useState(false)
  const {id} = useParams()

  useEffect(() => {
    (async () => {
      const menu = await getMenuById(id)
      let slicedDate = menu.date.slice(0,10)
      menu.date = new Date(slicedDate).toDateString()
      setMenu(menu)
      setLoaded(true)
    })()
  },[])
  return (
    <>
      {loaded &&
        <Container className="mt-2">
          <Row className="align-items-center justify-content-space-between mb-2">
            <Col>
              <h1>Menu for {menu.date}</h1>
            </Col>
            <Col xs="auto" sm="auto" md="auto" lg="auto">
              <PageLinks addLinks={[{href: `/chef/menus/${menu._id}/edit`, text: 'Edit'}]}/>
            </Col>
          </Row>
          <Accordian defaultActiveKey="0" variant="success">
            {menu.recipes.map((recipe,index) => {
              return(
                <Accordian.Item eventKey={index} key={index}>
                  <Accordian.Header>{recipe.title} | Serves: {recipe.servings} | Prep time: {recipe.prepTime}</Accordian.Header>
                  <Accordian.Body>
                    <Row>
                      <Col>
                        <h5>Ingredients:</h5>
                        <ul>
                          {recipe.ingredients.map((ingredient, index) => {
                            return (
                              <ol key={index}>{ingredient.amount} {ingredient.measurement} {ingredient.item}</ol>
                            )
                          })}
                        </ul>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h5>Directions</h5>
                        <p>{recipe.directions}</p>
                      </Col>
                    </Row>
                  </Accordian.Body>
                </Accordian.Item>
              )
            })}
          </Accordian>
        </Container>
      }
    </>
  )
}

export default ViewMenu
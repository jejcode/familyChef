import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button"
import Table from "react-bootstrap/Table"
import { getMenusByDateRange } from "../services/menu-service";
import { makeDatePrettier } from "../services/date-services";



const Dashboard = () => {
  const [todaysMenu, setTodaysMenu] = useState()
  const [upcomingMenus, setUpcomingMenus] = useState([])
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  const goToViewMenuPage = () => {
    navigate(`/chef/menus/${todaysMenu._id}/view`)
  }
  const makeDatePrettier = (dateString) => {
    dateString = dateString.substring(0, dateString.length-1)
    const date = new Date(dateString)
    // console.log("current date:", date.toUTCString())
    return date.toUTCString().slice(0,16)
  }
  useEffect (() => {
    (async () => {
      const todayRawDate = new Date().toLocaleDateString()
      let [month, day, year] = todayRawDate.split('/')
      month = (Number(month) < 10) ? `0${month}` : month
      const today = `${year}-${month}-${day}`
      // const today = new Date().toISOString().slice(0,10)
      console.log('today date:', today)
      const limit = new Date()
      limit.setDate(limit.getDate() + 6)
      const endDate = limit.toISOString().slice(0,10)
      try {
        const weekOfMenus = await getMenusByDateRange({start: today, end: endDate})
        console.log("menus for this week", weekOfMenus)
        if(weekOfMenus.length === 0) return
        if(today == weekOfMenus[0].date.slice(0,10)) {
          const [menuToday, ...restOfMenus] = weekOfMenus
          // console.log(menuToday)
          setTodaysMenu(menuToday)
          setUpcomingMenus(restOfMenus)
        } else {
          setUpcomingMenus(weekOfMenus)
        }
        setLoaded(true)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])
  return (
    <Container>
      
      <Row className="justify-content-center">
        <Col xs="auto" sm="auto" md="auto" lg="auto">
          <h1>Today's Menu</h1>
          {loaded &&
            <>{todaysMenu ?
              <div className="p-4 mb-4 bg-light rounded border border-success">
                {todaysMenu.recipes.map((recipe, index) => {
                  return (
                  <Row key={index} className="align-items-center">
                    <Col xs="auto" sm="auto" md="auto" lg="auto">
                      <h4 className="mb-0">{recipe.title}</h4>
                    </Col>
                    <Col xs="auto" sm="auto" md="auto" lg="auto" className="ms-2">
                      <span className="fst-italic">(Prep time: {recipe.prepTime})</span>
                    </Col>
                  </Row>
                  )
                })}
                <Row className="mt-4 justify-content-center">
                  <Col xs="auto" sm="auto" md="auto" lg="auto">
                    <Button variant="success" onClick={goToViewMenuPage}>Start Cooking</Button>
                  </Col>
                </Row>
              </div>
              
                :
                <div>No menu for today. Click here to create one.</div>
              }
            </>
          }
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="auto" sm="auto" md="auto" lg="auto">
          <Row className="justify-content-between">
            <Col>
              <h5>Upcoming menus</h5>
            </Col>
            <Col>
              <Link to="/chef/menus/all" className="me-2">View all</Link>|
              <Link to="/chef/menus/new" className="ms-2">Create new</Link>
            </Col>
          </Row>
          <Table hover>
            <thead>
              <tr>
                <th>Date</th>
                <th>Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcomingMenus.map((menu, index) => {
                return(
                  <tr key={index}>
                    <td>
                      {/* {console.log("map date", menu.date)} */}
                      {makeDatePrettier(menu.date)}
                    </td>
                    <td>
                      {menu.recipes.map((recipe, rIndex) => {
                        return (
                          <div key={rIndex}>{recipe.title}</div>
                        )
                      })}
                    </td>
                    <td>
                      <Link className="me-2" to={`/chef/menus/${menu._id}/edit`}>Edit</Link> 
                      |<Link className="ms-2">Delete</Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard
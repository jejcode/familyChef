import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ViewAllMenus from "../components/menus/ViewAllMenus";

const Dashboard = () => {
  const [todaysMenu, setTodaysMenu] = useState();
  const [upcomingMenus, setUpcomingMenus] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  const goToViewMenuPage = () => {
    navigate(`/chef/menus/${todaysMenu._id}/view`);
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs="10" sm="10" md="10" lg="10" xl="10" xxl="10">
          <h1>Today's Menu</h1>
          {todaysMenu ? (
            <div className="p-4 mb-4 bg-light rounded border border-success">
              {todaysMenu.recipes.map((recipe, index) => {
                return (
                  <Row key={index} className="align-items-center">
                    <Col xs="auto" sm="auto" md="auto" lg="auto">
                      <h4 className="mb-0">{recipe.title}</h4>
                    </Col>
                    <Col
                      xs="auto"
                      sm="auto"
                      md="auto"
                      lg="auto"
                      className="ms-2"
                    >
                      <span className="fst-italic">
                        (Prep time: {recipe.prepTime})
                      </span>
                    </Col>
                  </Row>
                );
              })}
              <Row className="mt-4 justify-content-center">
                <Col xs="auto" sm="auto" md="auto" lg="auto">
                  <Button variant="success" onClick={goToViewMenuPage}>
                    Start Cooking
                  </Button>
                </Col>
              </Row>
            </div>
          ) : (
            <div>No menu for today. Click here to create one.</div>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="10" sm="10" md="10" lg="10" xl="10" xxl="10">
          <Row className="justify-content-between">
            <Col xs="auto" sm="auto" md="auto" lg="auto">
              <h5>Upcoming menus</h5>
            </Col>
            <Col>
              <Link to="/chef/menus/all" className="me-2 text-success">
                View all
              </Link>
              |
              <Link to="/chef/menus/new" className="ms-2 text-success">
                Create new
              </Link>
            </Col>
          </Row>
          <ViewAllMenus showAllMenus={false} setTodaysMenu={setTodaysMenu} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

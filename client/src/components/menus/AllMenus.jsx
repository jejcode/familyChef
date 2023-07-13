import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMenus } from "../../services/menu-service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BsFillPlusCircleFill} from "react-icons/bs"

const AllMenus = () => {
  const [loaded, setLoaded] = useState(false);
  const [allMenus, setAllMenus] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const menus = await getAllMenus();
        setAllMenus(menus);
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
          <h2>All Menus</h2>
        </Col>
        <Col>
        <Link to="/chef/menus/new">
          <BsFillPlusCircleFill />
        </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          {allMenus.map((menu, index) => {
            return (
              <Row key={index} className="mb-2">
                <Col lg="auto">
                  <Link to={`/chef/menus/${menu._id}/view`}>
                    {menu.date.slice(0,10)}
                  </Link>
                </Col>
                <Col lg="auto">
                  {menu.notes && <p>Notes: {menu.notes}</p>}
                </Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};
export default AllMenus;

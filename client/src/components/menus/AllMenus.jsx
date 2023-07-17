import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMenus, deleteMenuById } from "../../services/menu-service";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BsFillPlusCircleFill, BsFillTrashFill, BsFillPencilFill} from "react-icons/bs"


const AllMenus = () => {
  const [loaded, setLoaded] = useState(false);
  const [allMenus, setAllMenus] = useState([]);

  const deleteThisMenu = async (menuId) => {
    try {
      const deletedMenu = await deleteMenuById(menuId)
      setAllMenus(prevAllMenus => prevAllMenus.reduce((arr, menu) => {
        if(menu._id != menuId) {
          arr.push(menu)
        }
        return arr
      }, []))
    } catch (error) {
      console.log(error)
    }
  }
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
    <>
    {loaded && 
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
                  <Col xs="6" sm="auto" md="auto" lg="auto">
                    <div>
                      {menu.notes && <p>Notes: {menu.notes}</p>}
                    </div>
                  </Col>
                  <Col xs="auto" sm="auto" md="auto" lg="auto">
                    <Link className="mx-4" to={`/chef/menus/${menu._id}/edit`}>
                      <BsFillPencilFill />
                    </Link>
                    <BsFillTrashFill onClick={() => deleteThisMenu(menu._id)}/>
                  </Col>
                </Row>
              );
            })}
          </Col>
        </Row>
      </Container>
    }
    </>
  );
};
export default AllMenus;

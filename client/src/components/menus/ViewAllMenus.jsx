import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeDatePrettier } from "../../services/date-services";
import { getAllMenus, getMenusByDateRange } from "../../services/menu-service";
import DeleteMenuModal from "../modals/DeleteMenuModal";
import Table from "react-bootstrap/Table";
import editIcon from "../../assets/writing.png";

const ViewAllMenus = (props) => {
  const { showAllMenus, setTodaysMenu } = props;
  const [loaded, setLoaded] = useState(false);
  const [allMenus, setAllMenus] = useState([]);

  useEffect(() => {
    if (showAllMenus) {
      (async () => {
        try {
          const menus = await getAllMenus();
          setAllMenus(menus);
          setLoaded(true);
        } catch (err) {
          console.log(err);
        }
      })();
    } else {
      // manipulate strings to avoid time-zone over-write
      const todayRawDate = new Date().toLocaleDateString();
      let [month, day, year] = todayRawDate.split("/");
      month = Number(month) < 10 ? `0${month}` : month;
      day = Number(day) < 10 ? `0${day}` : day
      const today = `${year}-${month}-${day}`;
      const limit = new Date();
      limit.setDate(limit.getDate() + 6);
      const endDate = limit.toISOString().slice(0, 10);
      console.log("date range", today, endDate);
      (async () => {
        try {
          const weekOfMenus = await getMenusByDateRange({
            start: today,
            end: endDate,
          });
          if (weekOfMenus.length === 0) return;
          console.log('pre slice:', weekOfMenus)
          console.log("week of menus:", weekOfMenus[0].date.slice(0, 10));
          if (today == weekOfMenus[0].date.slice(0, 10)) {
            const [menuToday, ...restOfMenus] = weekOfMenus;
            console.log('today:', menuToday);
            console.log(restOfMenus);
            setTodaysMenu(menuToday);
            setAllMenus(restOfMenus);
          } else {
            setAllMenus(weekOfMenus);
          }
          setLoaded(true);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);
  return (
    <>
      {loaded && (
        <Table hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allMenus.map((menu, index) => {
              return (
                <tr key={index}>
                  <td>
                    {/* {console.log("map date", menu.date)} */}
                    {makeDatePrettier(menu.date)}
                  </td>
                  <td>
                    {menu.recipes.map((recipe, rIndex) => {
                      console.log(recipe);
                      return (
                        <div key={rIndex}>
                          <Link
                            to={`/chef/recipes/${recipe._id}/view`}
                            className="text-success"
                          >
                            {recipe.title}
                          </Link>
                        </div>
                      );
                    })}
                    {menu.notes && <div>Notes: {menu.notes}</div>}
                  </td>
                  <td>
                    <Link
                      className="me-2 text-success"
                      to={`/chef/menus/${menu._id}/edit`}
                    >
                      <img src={editIcon} width="25" />
                    </Link>
                    <DeleteMenuModal
                      menuId={menu._id}
                      setAllMenus={setAllMenus}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ViewAllMenus;

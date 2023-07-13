import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api"
});

const createMenu = async (formData) => {
  try{
    const newMenu = await instance.post('menus/new', formData)
    return newMenu.data
  } catch(err) {console.log(err)}
}
const getAllMenus = async () => {
  try {
    const allMenus = await instance.get('menus/all');
    return allMenus.data;
  } catch (err) {
    console.log(err);
  }
};


export {createMenu, getAllMenus}
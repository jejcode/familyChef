// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/navigation/Header";
import NewRecipe from "./views/NewRecipe";
import AllRecipes from "./components/recipes/AllRecipes";
import ViewRecipe from "./components/recipes/ViewRecipe";
import EditRecipe from "./components/recipes/EditRecipe";
import AllMenus from "./components/menus/AllMenus";
import NewMenu from "./views/NewMenu";



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<NewRecipe />} path="chef/recipes/new" />
        <Route element={<AllRecipes />} path="chef/recipes/all" />
        <Route element={<ViewRecipe />} path="chef/recipes/:id/view" />
        <Route element={<EditRecipe editRecipe={true}/>} path="chef/recipes/:id/edit" />
        <Route element={<AllMenus />} path="chef/menus/all" />
        <Route element={<NewMenu />} path="chef/menus/new" />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

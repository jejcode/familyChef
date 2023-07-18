// import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/navigation/Header";
import NewRecipe from "./views/NewRecipe";
import AllRecipes from "./components/recipes/AllRecipes";
import ViewRecipe from "./components/recipes/ViewRecipe";
import EditRecipe from "./views/EditRecipe";
import AllMenus from "./components/menus/AllMenus";
import NewMenu from "./views/NewMenu";
import ViewMenu from "./components/menus/ViewMenu";
import EditMenu from "./views/EditMenu";
import Dashboard from "./views/Dashboard";
import ShoppingList from "./views/ShoppingList";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<NewRecipe />} path="chef/recipes/new" />
        <Route element={<AllRecipes />} path="chef/recipes/all" />
        <Route element={<ViewRecipe />} path="chef/recipes/:id/view" />
        <Route
          element={<EditRecipe editRecipe={true} />}
          path="chef/recipes/:id/edit"
        />
        <Route element={<AllMenus />} path="chef/menus/all" />
        <Route element={<NewMenu />} path="chef/menus/new" />
        <Route element={<ViewMenu />} path="chef/menus/:id/view" />
        <Route element={<EditMenu />} path="chef/menus/:id/edit" />

        <Route element={<ShoppingList />} path="chef/shoppinglist" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

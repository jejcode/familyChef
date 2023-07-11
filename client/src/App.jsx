// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import NewRecipe from '../views/NewRecipe';
import AllRecipes from './components/AllRecipes';
import ViewRecipe from './components/ViewRecipe';

function App() {
  

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<NewRecipe />} path='chef/recipes/new'/>
        <Route element={<AllRecipes />} path='chef/recipes/all'/>
        <Route element={<ViewRecipe />} path='chef/recipes/:id/view'/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

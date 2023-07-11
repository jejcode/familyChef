import axios from 'axios'

const instance = axios.create({
  baseURL: "http://localhost:8000/api"
})

const createRecipe = async (formData) => {
  console.log('form data:', formData)
  try {
    const newRecipe = await instance.post(`recipes/new`, formData)
    return newRecipe.data

  } catch(err) {
    console.log('This is the error', err)
  }
}

// const getAllRecipes = async ()
export {createRecipe}
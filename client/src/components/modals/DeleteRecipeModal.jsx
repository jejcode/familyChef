import React, { useState } from "react";
import "../../App.css";
import { deleteRecipeById } from "../../services/recipe-service";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import xMark from "../../assets/x-mark.png";

const DeleteRecipeModal = (props) => {
  const { recipeId, setAllRecipes, allRecipes } = props;
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const deleteItem = async () => {
    try {
      const deletedRecipe = await deleteRecipeById(recipeId);
      setAllRecipes((prevAllRecipes) => {
        const newRecipeList = prevAllRecipes.reduce((acc, recipe) => {
          if (recipe._id != deletedRecipe._id) {
            acc.push(recipe);
          }
          return acc;
        }, []);
        return newRecipeList;
      });
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <img
        src={xMark}
        alt="x delete"
        width="25"
        onClick={handleShow}
        className="changePointer"
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete recipe?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteItem}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteRecipeModal;

import React, {useState} from 'react'
import '../../App.css'
import { deleteMenuById } from '../../services/menu-service'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import xMark from '../../assets/x-mark.png'

const DeleteMenuModal = (props) => {
  const {menuId, setDeletedMenu} = props
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const deleteItem = async () => {
    try {
      const deletedMenu = await deleteMenuById(menuId)
      setDeletedMenu(deletedMenu)
      handleClose()
    } catch (error) {
      console.log(error)
    }
    
  }
  return (
    <>
      <img src={xMark} alt="x delete" width="25" onClick={handleShow} className="changePointer"/>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
            <Modal.Title>Delete Menu</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete menu?</Modal.Body>
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
  )
}

export default DeleteMenuModal

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import sendDataToAPIWarehouse from '../functions/POSTDataWarehouse';

function CreateWarehouse() {

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    removed: 0,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const modalStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cambia el nivel de transparencia según tus preferencias
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpload = () => {
    sendDataToAPIWarehouse(formData);
    handleClose();
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        Agregar
      </Button>

      <Modal show={show} onHide={handleClose} style={modalStyle}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Bodega</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="type_input">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="removed_input">
              <Form.Label>Eliminado</Form.Label>
              <Form.Control
                type="number"
                name="removed"
                value={formData.removed}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            Cerrar
          </Button>
     
            <Button variant="dark" onClick={handleUpload}>
            Agregar
          
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
  
export default CreateWarehouse;

export function openCreateModal(setShow: React.Dispatch<React.SetStateAction<boolean>>) {
  setShow(true);
}
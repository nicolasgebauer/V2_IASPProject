import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// Importa la función sendDataToAPIProduct desde el archivo adecuado
import sendDataToAPIProduct from '../functions/POSTDataProduct';

function CreateProduct() {
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    sku: '',
    parentsku: '',
    size: '',
    gender: '',
    price: 0,
    cost: 0,
    codebar: '',
    name: '',
    category: '',
    removed: 0,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpload = () => {
    sendDataToAPIProduct(formData);
    handleClose();
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        Agregar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="sku">
              <Form.Label>Sku</Form.Label>
              <Form.Control
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId="parentsku">
              <Form.Label>ParentSKU</Form.Label>
              <Form.Control
                type="text"
                name="parentsku"
                value={formData.parentsku}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="size">
              <Form.Label>Tamaño</Form.Label>
              <Form.Control
                type="text"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Género</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="cost">
              <Form.Label>Costo</Form.Label>
              <Form.Control
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="codebar">
              <Form.Label>Codebar</Form.Label>
              <Form.Control
                type="text"
                name="codebar"
                value={formData.codebar}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="removed">
              <Form.Label>Eliminado</Form.Label>
              <Form.Control
                type="number"
                name="removed"
                value={formData.removed}
                onChange={handleInputChange}
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

export default CreateProduct;

export function openCreateProduct(setShow: React.Dispatch<React.SetStateAction<boolean>>) {
  setShow(true);
}

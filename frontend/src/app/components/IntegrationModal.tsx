import styled from 'styled-components';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import sendDataToAPIIntegration from '../functions/POSTDataIntegration';
import Link from 'next/link';

function CreateModal() {

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    type: '',
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const modalStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpload = () => {
    sendDataToAPIIntegration(formData);
    handleClose();
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        Agregar
      </Button>

      <Modal show={show} onHide={handleClose} style={modalStyle}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar API</Modal.Title>
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
            <Form.Group className="mb-3" controlId="url">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
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
              Subir
          
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
  
export default CreateModal;

export function openCreateModal(setShow: React.Dispatch<React.SetStateAction<boolean>>) {
  setShow(true);
}
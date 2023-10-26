import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import sendDataToAPIInventory from '../../functions/POSTDataInventory';

interface Product {
  sku: string;
  name: string; // Asegúrate de tener el campo 'name' en la interfaz
}

interface Warehouse {
  id: string;
  name: string;
  type: string;
  removed: number;
}

interface InventoryData {
  product_id: number;
  warehouse_id: number;
  amount: number;
}

function CreateInventory() {
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [formData, setFormData] = useState<InventoryData>({
    product_id: 0,
    warehouse_id: 0, // Asegúrate de que estás capturando el ID del almacén
    amount: 0,
  });
  const modalStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  useEffect(() => {
    fetch('http://localhost:8000/products/')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
      });

    fetch('http://localhost:8001/warehouses/')
      .then((response) => response.json())
      .then((data) => {
        setWarehouses(data);
      })
      .catch((error) => {
        console.error('Error al obtener los almacenes:', error);
      });
  }, []);

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
    console.log('Datos a enviar a la API:', formData);
    sendDataToAPIInventory(formData);
    handleClose();
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow}>
        Agregar
      </Button>

      <Modal show={show} onHide={handleClose} style={modalStyle}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Inventario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="id_product">
              <Form.Label>Seleccionar Producto</Form.Label>
              <Form.Control
                as="select"
                type="number"
                name="product_id"
                value={formData.product_id}
                onChange={handleInputChange}
              >
                <option value="">Seleccionar producto</option>
                {products.map((product) => (
                  <option key={product.sku} value={product.sku}>
                    {product.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="id_warehouse">
              <Form.Label>Seleccionar Bodega</Form.Label>
              <Form.Control
                as="select"
                type="number"
                name="warehouse_id"
                value={formData.warehouse_id}
                onChange={handleInputChange}
              >
                <option value="">Bodega</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="amount">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
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

export default CreateInventory;

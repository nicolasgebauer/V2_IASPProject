import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import sendDataToAPIProductSale from '../../functions/POSTDataProductSale';

interface Product {
  sku: string;
  name: string;
  price: number;

}

interface ProductSale {
  sale_id: number;
  product_id: number;
  count: number;
  removed: number;
}

function AddProductSale({ saleId }: { saleId: number }) {
  const [show, setShow] = useState(true);  // Mostrar el modal por defecto
  const [products, setProducts] = useState<Product[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [formData, setFormData] = useState<ProductSale>({
    sale_id: 0,
    product_id: 0,
    count: 0,
    removed: 0,
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

    handleShow();
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
    const dataWithSaleId = { ...formData, sale_id: saleId };
    console.log('Datos a enviar a la API:', dataWithSaleId);
    sendDataToAPIProductSale(dataWithSaleId);
    handleClose();
  };
  
  const calculateTotalAmount = () => {
    const product = products.find((product) => product.sku === formData.product_id.toString());
    if (product && formData.count > 0) {
      return (formData.count * product.price).toFixed(2);
    } 
    return '0.00';
  };

  return (
    <Modal show={show} onHide={handleClose} style={modalStyle}>
    <Modal.Header closeButton>
      <Modal.Title>Agregar Producto</Modal.Title>
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
        <Form.Group controlId="amount">
        <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              name="count"
              value={formData.count}
              onChange={handleInputChange}
            />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <span style={{ marginRight: 'auto' }}>Monto Total: ${calculateTotalAmount()}</span>
      <Button variant="outline-dark" onClick={handleClose}>
        Cerrar
      </Button>
      <Button variant="dark" onClick={handleUpload}>
        Agregar
      </Button>
    </Modal.Footer>
  </Modal>
  );
}

export default AddProductSale;

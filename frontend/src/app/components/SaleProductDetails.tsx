import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface SalesProducts {
  sale_id: number;
  product_id: number;
  count: number;
  removed: number;
}

interface Product {
  sku: string;
  parentsku: string;
  size: string;
  gender: string;
  price: number;
  cost: number;
  codebar: string;
  name: string;
  category: string;
  removed: number;
}

interface SaleProductsProps {
  saleId: number;
}

const SaleProducts: React.FC<SaleProductsProps> = ({ saleId }) => {
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const modalStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const handleViewProducts = async (saleId: number) => {
    try {
      const response = await axios.get(`http://localhost:8004/sales/${saleId}/products`);
      const salesProducts = response.data as SalesProducts[];
  
      
      const productPromises = salesProducts.map(async (sp) => {
        
        const productIdString = String(sp.product_id).padStart(3, '0');
        
        const productResponse = await axios.get(`http://localhost:8000/products/${productIdString}`);
        return productResponse.data as Product;
      });
  
      const productsData = await Promise.all(productPromises);
      console.log(productsData);
      setProducts(productsData);
  
      setShowProductsModal(true); 
    } catch (error) {
      console.error('Error al obtener productos relacionados:', error);
    }
  };

  useEffect(() => {
    handleViewProducts(saleId);
  }, [saleId]);

  const handleCloseModal = () => setShowProductsModal(false);

  return (
    <>
      <Modal show={showProductsModal} onHide={handleCloseModal} style={modalStyle}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {products.map((product) => (
            <div key={product.sku}>
              <p>Name: {product.name}</p>
              <p>Price: ${product.price.toFixed(2)}</p>
              <p>SKU: {product.sku}</p>
              <hr /> 
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SaleProducts;

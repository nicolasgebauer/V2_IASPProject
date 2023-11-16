import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';

const apiSalesProductsUrl = 'http://localhost:8004/sales/';
const labelStyle = {
  fontWeight: 'bold',
  marginRight: '8px',
};

const lineStyle = {
  borderBottom: '1px solid #ccc',
  marginBottom: '8px',
  display: 'flex',
  alignItems: 'center',
};

interface SalesProducts {
  sale_id: number;
  product_id: number;
  count: number;
  removed: number;
}

interface Sale {
  id: number;
  integration_id: number;
  date: string;
  amount_products: number;
  total_price: number;
  state: string;
  country: string;
  city: string;
  municipality: string;
  street: string;
  number_street: string;
  client_rut: string;
  client_name: string;
  client_email: string;
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

interface SaleDetailsProps {
  show: boolean;
  handleClose: () => void;
  saleData?: Sale;
}

const SaleDetails: React.FC<SaleDetailsProps> = ({ show, handleClose, saleData }) => {
  const modalStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };



  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={modalStyle}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Detalles de la Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={lineStyle}>
          <span style={labelStyle}>ID:</span>
          <p>{saleData?.id}</p>
        </div>
        <div style={lineStyle}>
          <span style={labelStyle}>Integration ID:</span>
          <p>{saleData?.integration_id}</p>
        </div>
        <div style={lineStyle}>
          <span style={labelStyle}>Fecha:</span>
          <p>{saleData?.date}</p>
        </div>
        <div style={lineStyle}>
          <span style={labelStyle}>Cantidad de Productos:</span>
          <p>{saleData?.amount_products}</p>
        </div>
        <div style={lineStyle}>
          <span style={labelStyle}>Precio Total:</span>
          <p>${saleData?.total_price ? saleData.total_price.toFixed(2) : 'N/A'}</p>
        </div>
        <div style={lineStyle}>
          <span style={labelStyle}>Estado:</span>
          <p>{saleData?.state}</p>
        </div>
        <div style={lineStyle}>
          <span style={labelStyle}>País:</span>
          <p>{saleData?.country}</p>
        </div>
        <div style={lineStyle}>
          <span style={labelStyle}>Ciudad:</span>
          <p>{saleData?.city}</p>
        </div>
        <div style={lineStyle}>
          <span style={labelStyle}>Municipio:</span>
          <p>{saleData?.municipality}</p>
        </div>
        <div style={lineStyle}>
          <span style={labelStyle}>Calle:</span>
          <p>{saleData?.street}</p>
        </div>
        <div style={lineStyle}>
          <span style={labelStyle}>Número de Calle:</span>
          <p>{saleData?.number_street}</p>
        </div>
        <div style={lineStyle}>
          <span style={labelStyle}>RUT del Cliente:</span>
          <p>{saleData?.client_rut}</p>
        </div>
        <div style={lineStyle}>
          <span style={labelStyle}>Nombre del Cliente:</span>
          <p>{saleData?.client_name}</p>
        </div>
        <div style={lineStyle}>
          <span style={labelStyle}>Correo Electrónico del Cliente:</span>
          <p>{saleData?.client_email}</p>
        </div>
        </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaleDetails;
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

const apiSalesUrl = 'http://localhost:8004/sales/'; 

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

interface Warehouse {
  id: string;
  name: string;
  type: string;
  removed: number;
}

interface SaleDetailsProps {
  show: boolean;
  handleClose: () => void;
  saleData: Sale;
}

const SaleDetails: React.FC<SaleDetailsProps> = ({ show, handleClose, saleData }) => {
  const modalStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  return (
    <a>hola</a>
  );
};

export default SaleDetails;

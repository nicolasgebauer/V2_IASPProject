import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import sendDataToAPISale from "../../functions/POSTDataSales";

interface SaleFormData {
  integration_id?: number;
  date: string;
  state: string;
  country: string;
  city: string ;
  municipality: string;
  street: string ;
  number_street: string;
  client_rut: string;
  client_name: string;
  client_email: string;
  removed: number;
}

interface CreateSaleProps {
  onClose: () => void;
}


function CreateSale(props: CreateSaleProps) {
  const [formData, setFormData] = useState<SaleFormData>({
    integration_id: 0,
    date: new Date().toISOString(), // Asegura que date sea inicializado como una cadena
    state: '',
    country: '',
    city: '',
    municipality: '',
    street: '',
    number_street: '',
    client_rut: '',
    client_name: '',
    client_email: '',
    removed: 0,
  });

  const formatDate = (date: Date): string => {
    const isoString = date.toISOString();
    return isoString.slice(0, isoString.length - 1); // Elimina la 'Z' al final y usa la cadena completa
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'date' ? new Date(value) : value,
    }));
  };

  const handleUpload = () => {
    console.log("Datos a enviar:", formData);
    sendDataToAPISale(formData);
    props.onClose(); 
  };

  return (
    <div>
      <h2>Nueva Venta</h2>
      <Form>
        <Form.Group controlId="integration_id">
          <Form.Label>ID de integración</Form.Label>
          <Form.Control
            type="number"
            name="integration_id"
            value={formData.integration_id}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="date">
          <Form.Label>Fecha</Form.Label>
          <Form.Control
            type="datetime-local" // Usa type="datetime-local" para mostrar fecha y hora
            name="date"
            value={formatDate(new Date(formData.date))}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>País</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="municipality">
          <Form.Label>Municipio</Form.Label>
          <Form.Control
            type="text"
            name="municipality"
            value={formData.municipality}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="street">
          <Form.Label>Calle</Form.Label>
          <Form.Control
            type="text"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="number_street">
          <Form.Label>Número de Calle</Form.Label>
          <Form.Control
            type="text"
            name="number_street"
            value={formData.number_street}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="client_rut">
          <Form.Label>RUT del Cliente</Form.Label>
          <Form.Control
            type="text"
            name="client_rut"
            value={formData.client_rut}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="client_name">
          <Form.Label>Nombre del Cliente</Form.Label>
          <Form.Control
            type="text"
            name="client_name"
            value={formData.client_name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="client_email">
          <Form.Label>Email del Cliente</Form.Label>
          <Form.Control
            type="email"
            name="client_email"
            value={formData.client_email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="dark" onClick={handleUpload}>
          Agregar Venta
        </Button>
        <Button variant="outline-dark" onClick={props.onClose}>
          Cerrar
        </Button>
      </Form>
    </div>
  );
}

export default CreateSale;

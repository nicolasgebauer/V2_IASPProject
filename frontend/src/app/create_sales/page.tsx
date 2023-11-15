"use client";
import React, { useState } from 'react';
import CreateSale from '../components/create/CreateSale';
import SalesTable from '../components/tables/SalesTable';
import NavbarSales from '../components/general/NavbarSales';
import Button from 'react-bootstrap/Button';
import "./styles.css";
import { darkTheme } from '../styles/theme';
import SalesTableSale from '../components/tables/SalesTableSale';

export default function Products() {
  const [showCreateSale, setShowCreateSale] = useState(false);

  const handleShowCreateSale = () => {
    setShowCreateSale(true);
  };

  const handleCloseCreateSale = () => {
    setShowCreateSale(false);
  };

  return (
    <div className="container-fluid">
      <NavbarSales />
      <div className="container-table">
        <SalesTableSale/>
      </div>
      <div className="container-button">
        <Button variant="dark" onClick={handleShowCreateSale}>
          Agregar Venta
        </Button>
        {showCreateSale && <CreateSale onClose={() => setShowCreateSale(false)} />}
      </div>
    </div>
  );
}

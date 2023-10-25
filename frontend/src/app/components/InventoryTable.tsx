"use client";
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';
import { darkTheme } from '../styles/theme';
const {nextui} = require("@nextui-org/react");


const apiUrl = 'http://localhost:8000/products/';

const TableContainer = styled.div`
  margin-top: 0rem;
  margin-left: 207px;
  background: ${darkTheme.white};
  color: ${darkTheme.black};
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${darkTheme.white};
  color: ${darkTheme.black};

  th, td {
    padding: 0.5rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
    background: ${darkTheme.white};
    color: ${darkTheme.black};
  }

  th {
    background-color: #f2f2f2;
    background: ${darkTheme.white};
    color: ${darkTheme.black};
  }
`;

interface Inventory {
  product_id: number;
  warehouse_id: number;
  amount: number;
}
const sampleProducts = [
    {
      product_id: 1,
      warehouse_id: 1,
      amount: 100,
    }
  ];
  
  const InventoryTable = () => {
    
    const [inventoryData, setInventoryData] = useState<Inventory[]>([]);


    useEffect(() => {
      axios.get('http://localhost:8002/inventorys')
        .then(response => {
          setInventoryData(response.data as Inventory[]);
        })
        .catch(error => {
          console.error('Error al obtener datos de la API', error);
        });
    }, []);

    return (
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>ID Producto</th>
              <th>ID Bodega</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData.map((inventory, index) => (
              <tr key={index}>
                <td>{inventory.product_id}</td>
                <td>{inventory.warehouse_id}</td>
                <td>{inventory.amount}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
        
      </TableContainer>
    );
  };
  export default InventoryTable;
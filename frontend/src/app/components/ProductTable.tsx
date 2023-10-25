"use client";
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';
import { darkTheme } from '../styles/theme';
const {nextui} = require("@nextui-org/react");


const apiUrl = 'http://localhost:8000/products/';

const TableContainer = styled.div`
  margin-top: 0rem;
  margin-left: 100px;
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
  
  const ProductsTable = () => {
    
    const [productData, setProductData] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
      fetchProducts();
    }, []);

    const fetchProducts = async () => {
      try {
        const response = await axios.get(apiUrl);
        setProductData(response.data as Product[]);
      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }
    }

    const handleSearch = async () => {
      if (searchTerm === "") {
        fetchProducts();
      } else {
        try {
          const response = await axios.get(`http://localhost:8000/search?q=${searchTerm}`);
          setProductData(response.data as Product[]);
        } catch (error) {
          console.error('Error al buscar productos', error);
        }
      }
    }

    return (
      <TableContainer>
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar producto..."
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>

        <StyledTable>
        <thead>
            <tr>
              <th>SKU</th>
              <th>Nombre</th>
              <th>Tamaño</th>
              <th>Género</th>
              <th>Precio</th>
              <th>Costo</th>
              <th>Código de Barras</th>
              <th>Categoría</th>
              <th>Eliminado</th>
            </tr>
          </thead>
          <tbody>
            {productData.map(product => (
              <tr key={product.sku}>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.size}</td>
                <td>{product.gender}</td>
                <td>{product.price}</td>
                <td>{product.cost}</td>
                <td>{product.codebar}</td>
                <td>{product.category}</td>
                <td>{product.removed}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
        
      </TableContainer>
    );
  };

export default ProductsTable;
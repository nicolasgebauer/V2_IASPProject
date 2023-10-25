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
const sampleProducts = [
    {
      sku: "SKU-001",
      parentsku: "ParentSKU-001",
      size: "Medium",
      gender: "Male",
      price: 29.99,
      cost: 15.99,
      codebar: "1234567890",
      name: "Product 1",
      category: "Clothing",
      removed: 0
    },
    {
      sku: "SKU-002",
      parentsku: "ParentSKU-002",
      size: "Large",
      gender: "Female",
      price: 39.99,
      cost: 22.99,
      codebar: "2345678901",
      name: "Product 2",
      category: "Clothing",
      removed: 0
    },
    {
      sku: "SKU-003",
      parentsku: "ParentSKU-003",
      size: "Small",
      gender: "Unisex",
      price: 19.99,
      cost: 11.99,
      codebar: "3456789012",
      name: "Product 3",
      category: "Accessories",
      removed: 0
    },
    {
      sku: "SKU-004",
      parentsku: "ParentSKU-004",
      size: "Medium",
      gender: "Male",
      price: 29.99,
      cost: 15.99,
      codebar: "4567890123",
      name: "Product 4",
      category: "Clothing",
      removed: 0
    }
  ];
  
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
          {/* ... Tu código de tabla existente ... */}
        </StyledTable>
        
      </TableContainer>
    );
  };

export default ProductsTable;
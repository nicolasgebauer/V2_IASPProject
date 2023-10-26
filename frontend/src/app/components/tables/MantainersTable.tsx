"use client";
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';
import { darkTheme } from '../../styles/theme';
const {nextui} = require("@nextui-org/react");
import Link from 'next/link';
import '../../products/products.css'; 
const apiUrl = 'http://localhost:8003/integrations/';

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

interface Integration {
  name: string;
  url: string;
  type: string;
}

const sampleProducts = [
    {
      name: "Falabella",
      url: "http://api_url_.cl",
      type: "mayorista",
    }
  ];
  
const IntegrationTable = () => {

    const [integrationData, setIntegrationData] = useState<Integration[]>([]);


    useEffect(() => {   
        axios.get(apiUrl)
        .then(response => {
        setIntegrationData(response.data as Integration[]);
        })
        .catch(error => {
            console.error('Error al obtener datos de la API', error);
        });
    }, []);

    return (
    <div>
        <TableContainer>
        <StyledTable>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>URL</th>
                <th>Tipo</th>   
            </tr>
            </thead>
            <tbody>
            {integrationData.map((integration, index) => (
                <tr key={index}>
                <td>{integration.name}</td>
                <td>{integration.url}</td>
                <td>{integration.type}</td>
                </tr>
            ))}
            </tbody>
        </StyledTable>
        
        </TableContainer>
        </div>
    );
    };
export default IntegrationTable;
"use client";
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import styled from 'styled-components';
import { darkTheme } from '../styles/theme';

const apiUrl = 'http://localhost:8001/warehouses';

const TableContainer = styled.div`
    margin-top: 0rem;
    margin-left: 100px;
    background: ${darkTheme.white};
    color: ${darkTheme.black};`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    background: ${darkTheme.white};
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
    }`;



interface Warehouse {
    name: string;
    type: string;
  
    removed: number;    
}
const WarehousesTable = () => {
    const [warehouseData, setWarehouseData] = useState<Warehouse[]>([]);

    useEffect(() => {
        axios.get(apiUrl)
        .then(response => {
            setWarehouseData(response.data as Warehouse[]);
        })
        .catch(error => {
            console.error('Error al obtener datos de la API: Warehouses', error);
        });
    }, [warehouseData]);

    return (
        <TableContainer>
            <StyledTable>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Eliminado</th>
                </tr>
                </thead>
                <tbody>
                {warehouseData.map(warehouse => (
                    <tr key={warehouse.name}>
                    <td>{warehouse.name}</td>
                    <td>{warehouse.type}</td>
                    <td>{warehouse.removed}</td>
                    </tr>
                ))}
                </tbody>
            </StyledTable>
        </TableContainer>
    );
};
export default WarehousesTable;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { darkTheme } from './../../styles/theme';
import Button from 'react-bootstrap/Button';
import './table.css';
import SaleDetails from '../SaleDetails';
import SaleProducts from '../SaleProductDetails';
import AssignWarehouseModal from '../create/ValidateSale';
const apiSalesUrl = 'http://localhost:8004/sales/';
const apiSalesProductUrl = 'http://localhost:8004/sales_products/';


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
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;



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

const SalesTable = () => {
  const [salesData, setSalesData] = useState<Sale[]>();
  const [isSaleDetailsOpen, setIsSaleDetailsOpen] = useState(false);
  const [selectedSaleData, setSelectedSaleData] = useState<Sale | undefined>();
  const [selectedSaleId, setSelectedSaleId] = useState<number | null>(null);
  const [showProductsModal, setShowProductsModal] = useState(false);
  const [isAssignWarehouseModalOpen, setAssignWarehouseModal] = useState(false); 

  useEffect(() => {
    axios.get(apiSalesUrl)
      .then(response => {
        setSalesData(response.data as Sale[]);
      })
      .catch(error => {
        console.error('Error al obtener datos de la API', error);
      });
  }, []);

  const handleViewProducts = async (saleId: number) => {
    setSelectedSaleId(saleId);
    setShowProductsModal(true);
  };


  const handleViewDetails = (saleId: number, saleData: Sale) => {
    setSelectedSaleData(saleData);
    setIsSaleDetailsOpen(true);
  };

  const handleAssignWarehouse = (saleId: number, saleData: Sale) => {
    setSelectedSaleData(saleData);
    setAssignWarehouseModal(true);
  };



  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Precio Total</th>
            <th>Estado</th>
  
          </tr>
        </thead>
        <tbody>
          {salesData && salesData.map(sale => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.date}</td>
              <td>${sale.total_price ? sale.total_price.toFixed(2) : 'N/A'}</td>
              <td>{sale.state}</td>
              <td>
                <ButtonContainer>
                <Button variant="outline-secondary" onClick={() => handleAssignWarehouse(sale.id, sale)}>Asignar Bodega</Button>
                  <Button variant="outline-secondary" onClick={() => handleViewDetails(sale.id, sale)}>Ver Detalles</Button>
                  <Button 
                        variant="outline-secondary" 
                        onClick={() => handleViewProducts(sale.id)}
                      >
                        Ver Productos
                      </Button>
                </ButtonContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      {showProductsModal && <SaleProducts saleId={selectedSaleId || 0} />}
      <SaleDetails show={isSaleDetailsOpen} handleClose={() => setIsSaleDetailsOpen(false)} saleData={selectedSaleData} />
      <AssignWarehouseModal show={isAssignWarehouseModalOpen} handleClose={() => setAssignWarehouseModal(false)} saleData={selectedSaleData} />
    </TableContainer>
  );
};

export default SalesTable;

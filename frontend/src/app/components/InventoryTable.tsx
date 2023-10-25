import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { darkTheme } from '../styles/theme';

const apiUrl = 'http://localhost:8002/inventorys';

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

const InventoryTable = () => {
  const [inventoryData, setInventoryData] = useState<Inventory[]>([]);
  const [editableData, setEditableData] = useState<Inventory[]>([]);

  useEffect(() => {
    axios.get(apiUrl)
      .then((response) => {
        setInventoryData(response.data as Inventory[]);
        setEditableData(response.data as Inventory[]); // Copia de los datos editables
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API', error);
      });
  }, []);

  const saveChangesToAPI = (editedItem: Inventory) => {
    const putUrl = `${apiUrl}/${editedItem.product_id}/${editedItem.warehouse_id}`;
    axios
      .put(putUrl, editedItem)
      .then(() => {
        console.log('Cambios guardados exitosamente');
        setInventoryData((prevData) =>
          prevData.map((item) =>
            item.product_id === editedItem.product_id &&
            item.warehouse_id === editedItem.warehouse_id
              ? editedItem
              : item
          )
        );
      })
      .catch((error) => {
        console.error('Error al guardar cambios:', error);
      });
  };

  const handleEdit = (index: number, field: keyof Inventory, value: any) => {
    const updatedData = [...editableData];
    updatedData[index][field] = value;
    setEditableData(updatedData);
  };

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>ID Producto</th>
            <th>ID Bodega</th>
            <th>Cantidad</th>
            <th>Acciones</th> 
          </tr>
        </thead>
        <tbody>
          {editableData.map((inventory, index) => (
            <tr key={index}>
              <td>{inventory.product_id}</td>
              <td>
                <input
                  type="text"
                  value={inventory.warehouse_id}
                  onChange={(e) => handleEdit(index, 'warehouse_id', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={inventory.amount}
                  onChange={(e) => handleEdit(index, 'amount', parseInt(e.target.value, 10))}
                />
              </td>
              <td>
                <button onClick={() => saveChangesToAPI(inventory)}>
                  Guardar Cambios
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default InventoryTable;

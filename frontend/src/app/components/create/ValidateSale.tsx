import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const apiSalesUrl = 'http://localhost:8004/sales/';

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

interface SalesProducts {
  sale_id: number;
  product_id: number;
  count: number;
  removed: number;
}

interface Warehouse {
  id: string;
  name: string;
  type: string;
  removed: number;
}



interface Inventory {
  product_id: number;
  warehouse_id: number;
  amount: number;
}

interface AssignWarehouseModalProps  {
  show: boolean;
  handleClose: () => void;
  saleData?: Sale;
}


const AssignWarehouseModal: React.FC<AssignWarehouseModalProps > = ({ show, handleClose, saleData }) => {
  const modalStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [eligibleWarehouses, setEligibleWarehouses] = useState<Warehouse[]>([]);

  const [showSelectWarehouseModal, setShowSelectWarehouseModal] = useState<boolean>(false);
  const [showNoEligibleWarehousesMessage, setShowNoEligibleWarehousesMessage] = useState<boolean>(false);
  const [salesProducts, setSalesProducts] = useState<SalesProducts[]>([]);
  const [inventory, setInventory] = useState<Inventory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener productos de la venta
        const salesProductsResponse = await axios.get(`http://localhost:8004/sales/${saleData?.id}/products`);
        const salesProductsData = salesProductsResponse.data as SalesProducts[];
        setSalesProducts(salesProductsData);

        // Obtener inventario
        const inventoryResponse = await axios.get('http://localhost:8002/inventorys/');
        const inventoryData = inventoryResponse.data as Inventory[];
        setInventory(inventoryData);

        // Obtener lista de bodegas
        const warehousesResponse = await axios.get('http://localhost:8001/warehouses/');
        const warehousesData = warehousesResponse.data as Warehouse[];
        setWarehouses(warehousesData);

        // Verificar inventario para cada producto de salesProducts
        const eligibleWarehousesData: Warehouse[] = [];
        salesProductsData.forEach((product) => {
          const matchingInventory = inventory.filter(
            (item) =>
              item.product_id === product.product_id &&
              item.amount >= product.count
          );

          // Obtener id de bodegas que cumplen con el inventario
          const matchingWarehouseIds = matchingInventory.map((item) => item.warehouse_id);

          // Filtrar las bodegas elegibles que cumplen con todos los productos
          const warehousesForProduct = warehousesData.filter((warehouse) =>
            matchingWarehouseIds.includes(Number(warehouse.id))
          );

          eligibleWarehousesData.push(...warehousesForProduct);
        });

        // Eliminar duplicados
        const uniqueEligibleWarehouses = Array.from(new Set(eligibleWarehousesData));

        setEligibleWarehouses(uniqueEligibleWarehouses);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    if (saleData?.id) {
      fetchData();
    }
  }, [saleData]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Resultado de asignación de bodega</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {eligibleWarehouses.length > 0 ? (
          <div>
            <h3>Bodegas que cumplen con los requisitos:</h3>
            <ul>
              {eligibleWarehouses.map((warehouse) => (
                <li key={warehouse.id}>{`Bodega ID: ${warehouse.id}, Nombre: ${warehouse.name}`}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <p>Ninguna bodega cumple con los requisitos.</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignWarehouseModal;

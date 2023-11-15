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

interface AssignWarehouseModalProps {
  show: boolean;
  onClose: () => void;
  saleData?: Sale;
}

const AssignWarehouseModal: React.FC<AssignWarehouseModalProps> = ({
  show,
  onClose,
  saleData,
}) => {
  const [salesProducts, setSalesProducts] = useState<SalesProducts[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [eligibleWarehouses, setEligibleWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null
  );
  const [showSelectWarehouseModal, setShowSelectWarehouseModal] = useState<
    boolean
  >(false);
  const [showNoEligibleWarehousesMessage, setShowNoEligibleWarehousesMessage] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchSalesProducts = async () => {
      if (saleData) {
        try {
          const response = await axios.get(
            `http://localhost:8004/sales/${saleData.id}/products`
          );
          const salesProductsData = response.data as SalesProducts[];
          setSalesProducts(salesProductsData);
        } catch (error) {
          console.error('Error al obtener salesProducts:', error);
        }
      }
    };

    const fetchWarehouses = async () => {
      try {
        const response = await axios.get('http://localhost:8001/warehouses/');
        const warehousesData = response.data as Warehouse[];
        setWarehouses(warehousesData);
      } catch (error) {
        console.error('Error al obtener almacenes:', error);
      }
    };

    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:8002/inventorys/');
        const inventoryData = response.data as Inventory[];
        setInventory(inventoryData);
      } catch (error) {
        console.error('Error al obtener inventario:', error);
      }
    };

    fetchSalesProducts();
    fetchWarehouses();
    fetchInventory();
  }, [saleData]);

  useEffect(() => {
    const eligibleWarehousesData = warehouses.filter((warehouse) => {
      return salesProducts.every((product) => {
        const productInventory = inventory.find(
          (item) =>
            item.product_id === product.product_id &&
            String(item.warehouse_id) === warehouse.id
        );

        return productInventory && productInventory.amount >= product.count;
      });
    });

    setEligibleWarehouses(eligibleWarehousesData);

    if (eligibleWarehousesData.length > 0) {
      setShowSelectWarehouseModal(true);
      setShowNoEligibleWarehousesMessage(false);
    } else {
      setShowSelectWarehouseModal(false);
      setShowNoEligibleWarehousesMessage(true);
    }
  }, [salesProducts, warehouses, inventory]);

  const handleSelectWarehouse = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setShowSelectWarehouseModal(false);
  };

  return (
    <>
      <Modal
        show={showSelectWarehouseModal}
        onHide={() => setShowSelectWarehouseModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccione una bodega</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {eligibleWarehouses.map((warehouse) => (
              <Form.Check
                key={warehouse.id}
                type="radio"
                label={warehouse.name}
                name="warehouse"
                id={`warehouse-${warehouse.id}`}
                onChange={() => handleSelectWarehouse(warehouse)}
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSelectWarehouseModal(false)}
          >
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>

      {showNoEligibleWarehousesMessage && (
        <div>
          <p>Ninguna bodega cumple con el inventario necesario.</p>
        </div>
      )}
    </>
  );
};

export default AssignWarehouseModal;

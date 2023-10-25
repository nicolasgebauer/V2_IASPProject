import axios from 'axios';


const apiUrl = 'http://localhost:8002/inventorys/';  

interface InventoryData {
    product_id: number;
    warehouse_id: number;
    amount: number;
  }


const sendDataToAPIInventory= async (inventoryData: InventoryData) => {
  console.log('Datos a enviar:', inventoryData);
  inventoryData.amount = parseFloat(inventoryData.amount.toString());
  inventoryData.warehouse_id = parseFloat(inventoryData.warehouse_id.toString());
  inventoryData.product_id = parseFloat(inventoryData.product_id.toString());
  try {
    const response = await axios.post(apiUrl, inventoryData);
    console.log('Datos enviados exitosamente:', response.data);
  } catch (error) {
    console.error('Error al enviar datos:', error);
  }
};

export default sendDataToAPIInventory;
import axios from 'axios';


const apiUrl = 'http://localhost:8001/warehouses/';  

interface WarehouseData {
    name: string;
    type: string;
    removed: number;
  }


const sendDataToAPIWarehouse = async (warehouseData: WarehouseData) => {
  try {
    const response = await axios.post(apiUrl, warehouseData);
    console.log('Datos enviados exitosamente:', response.data);
  } catch (error) {
    console.error('Error al enviar datos:', error);
  }
};

export default sendDataToAPIWarehouse;
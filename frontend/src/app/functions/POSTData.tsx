import axios from 'axios';

// Define la URL de tu API de FastAPI
const apiUrl = 'http://localhost:8000/products/';  // Asegúrate de usar la URL correcta de tu API

// Define los datos que deseas enviar
const productData = 
{
  "sku": "10101010",
  "parentsku": "string",
  "size": "string",
  "gender": "string",
  "price": 0,
  "cost": 0,
  "codebar": "string",
  "name": "string",
  "category": "string",
  "removed": 0
};

const sendDataToAPI = async () => {
  try {
    const response = await axios.post(apiUrl, productData);
    console.log('Datos enviados exitosamente:', response.data);
  } catch (error) {
    console.error('Error al enviar datos:', error);
  }
};

export default sendDataToAPI;
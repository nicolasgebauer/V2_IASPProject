import axios from 'axios';


const apiUrl = 'http://localhost:8003/integrations/';  

interface IntegrationData {
    name: string;
    url: string;
    type: string;
  }


const sendDataToAPIIntegration = async (integrationData: IntegrationData) => {
  try {
    const response = await axios.post(apiUrl, integrationData);
    console.log('Datos enviados exitosamente:', response.data);
  } catch (error) {
    console.error('Error al enviar datos:', error);
  }
};

export default sendDataToAPIIntegration;
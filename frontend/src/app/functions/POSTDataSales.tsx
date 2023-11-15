import axios from 'axios';

const SalesApiUrl = 'http://localhost:8004/sales/';


interface SaleData {
    integration_id?: number;
    date?: string;  
    state: string;
    country: string;
    city: string ;
    municipality: string;
    street: string ;
    number_street: string;
    client_rut: string;
    client_name: string;
    client_email: string;
    removed: number;
  }
  

const createSaleData = async (saleData: SaleData) => {
    try {
      const saleResponse = await axios.post(SalesApiUrl, saleData);
      console.log('Datos del producto enviados exitosamente:', saleResponse.data);
    } catch (error) {
      console.error('Error al enviar datos de la venta:', error);
    }
};

export default createSaleData;

import axios from 'axios';

const productApiUrl = 'http://localhost:8000/products/';


interface ProductData {
  sku: string;
  parentsku: string;
  size: string;
  gender: string;
  price: number;
  cost: number;
  codebar: string;
  name: string;
  category: string;
  removed: number;
}

const createProductData = async (productData: ProductData) => {
    try {
      const productResponse = await axios.post(productApiUrl, productData);
      console.log('Datos del producto enviados exitosamente:', productResponse.data);
    } catch (error) {
      console.error('Error al enviar datos del producto:', error);
    }
};

export default createProductData;

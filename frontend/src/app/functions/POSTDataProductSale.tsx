import axios from 'axios';

const ProductSalesApiUrl = 'http://localhost:8004/sales_products/';


interface ProductSaleData{
    sale_id: number;
    product_id: number;
    count: number;
    removed: number;
}

const createSaleData = async (productSaleData: ProductSaleData) => {
    try {
      const productSaleResponse = await axios.post(ProductSalesApiUrl, productSaleData);
      console.log('Datos del producto enviados exitosamente:', productSaleResponse.data);
    } catch (error) {
      console.error('Error al enviar datos de la venta:', error);
    }
};

export default createSaleData;

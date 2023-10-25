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

const createProductsData = async (productsData: ProductData[]) => {
    try {
        for (let i = 0; i < productsData.length; i++) {
            const productResponse = await axios.post(productApiUrl, productsData[i]);
            console.log('Datos de productos enviados exitosamente:', productResponse.data);
        }
    } catch (error) {
        console.error('Error al enviar datos de productos:', error);
    }
};

export default createProductsData;
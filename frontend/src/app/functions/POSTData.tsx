import axios from 'axios';

// Define la URL de tu API de FastAPI
const apiUrl = 'http://localhost:8000/products/';  // Asegúrate de usar la URL correcta de tu API

// Define los datos que deseas enviar
const productData = [
  {
    "sku": "SKU-001",
    "parentsku": "ParentSKU-001",
    "size": "Medium",
    "gender": "Male",
    "price": 29.99,
    "cost": 15.99,
    "codebar": "1234567890",
    "name": "Product 1",
    "category": "Clothing",
    "removed": 0
  },
  {
    "sku": "SKU-002",
    "parentsku": "ParentSKU-002",
    "size": "Large",
    "gender": "Female",
    "price": 39.99,
    "cost": 22.99,
    "codebar": "2345678901",
    "name": "Product 2",
    "category": "Clothing",
    "removed": 0
  },
  {
    "sku": "SKU-003",
    "parentsku": "ParentSKU-003",
    "size": "Small",
    "gender": "Unisex",
    "price": 19.99,
    "cost": 11.99,
    "codebar": "3456789012",
    "name": "Product 3",
    "category": "Accessories",
    "removed": 0
  },
  {
    "sku": "SKU-004",
    "parentsku": "ParentSKU-004",
    "size": "Medium",
    "gender": "Male",
    "price": 29.99,
    "cost": 15.99,
    "codebar": "4567890123",
    "name": "Product 4",
    "category": "Clothing",
    "removed": 0
  },
  {
    "sku": "SKU-005",
    "parentsku": "ParentSKU-005",
    "size": "Small",
    "gender": "Female",
    "price": 34.99,
    "cost": 18.99,
    "codebar": "5678901234",
    "name": "Product 5",
    "category": "Clothing",
    "removed": 0
  },
  {
    "sku": "SKU-006",
    "parentsku": "ParentSKU-006",
    "size": "Large",
    "gender": "Unisex",
    "price": 25.99,
    "cost": 13.99,
    "codebar": "6789012345",
    "name": "Product 6",
    "category": "Accessories",
    "removed": 0
  },
  {
    "sku": "SKU-007",
    "parentsku": "ParentSKU-007",
    "size": "Medium",
    "gender": "Female",
    "price": 29.99,
    "cost": 16.99,
    "codebar": "7890123456",
    "name": "Product 7",
    "category": "Clothing",
    "removed": 0
  },
  {
    "sku": "SKU-008",
    "parentsku": "ParentSKU-008",
    "size": "Large",
    "gender": "Male",
    "price": 35.99,
    "cost": 19.99,
    "codebar": "8901234567",
    "name": "Product 8",
    "category": "Clothing",
    "removed": 0
  },
  {
    "sku": "SKU-009",
    "parentsku": "ParentSKU-009",
    "size": "Small",
    "gender": "Unisex",
    "price": 21.99,
    "cost": 12.99,
    "codebar": "9012345678",
    "name": "Product 9",
    "category": "Accessories",
    "removed": 0
  },
  {
    "sku": "SKU-010",
    "parentsku": "ParentSKU-010",
    "size": "Medium",
    "gender": "Male",
    "price": 28.99,
    "cost": 14.99,
    "codebar": "0123456789",
    "name": "Product 10",
    "category": "Clothing",
    "removed": 0
  },
  {
    "sku": "SKU-011",
    "parentsku": "ParentSKU-011",
    "size": "Large",
    "gender": "Female",
    "price": 36.99,
    "cost": 21.99,
    "codebar": "1234567890",
    "name": "Product 11",
    "category": "Clothing",
    "removed": 0
  },
  {
    "sku": "SKU-012",
    "parentsku": "ParentSKU-012",
    "size": "Small",
    "gender": "Unisex",
    "price": 22.99,
    "cost": 13.99,
    "codebar": "2345678901",
    "name": "Product 12",
    "category": "Accessories",
    "removed": 0
  },
  {
    "sku": "SKU-013",
    "parentsku": "ParentSKU-013",
    "size": "Medium",
    "gender": "Male",
    "price": 30.99,
    "cost": 16.99,
    "codebar": "3456789012",
    "name": "Product 13",
    "category": "Clothing",
    "removed": 0
  },
  {
    "sku": "SKU-014",
    "parentsku": "ParentSKU-014",
    "size": "Large",
    "gender": "Female",
    "price": 37.99,
    "cost": 20.99,
    "codebar": "4567890123",
    "name": "Product 14",
    "category": "Clothing",
    "removed": 0
  },
  {
    "sku": "SKU-015",
    "parentsku": "ParentSKU-015",
    "size": "Small",
    "gender": "Unisex",
    "price": 23.99,
    "cost": 14.99,
    "codebar": "5678901234",
    "name": "Product 15",
    "category": "Accessories",
    "removed": 0
  },
  {
    "sku": "SKU-016",
    "parentsku": "ParentSKU-016",
    "size": "Medium",
    "gender": "Female",
    "price": 31.99,
    "cost": 17.99,
    "codebar": "6789012345",
    "name": "Product 16",
    "category": "Clothing",
    "removed": 0
  },
  {
    "sku": "SKU-017",
    "parentsku": "ParentSKU-017",
    "size": "Large",
    "gender": "Male",
    "price": 38.99,
    "cost": 22.99,
    "codebar": "7890123456",
    "name": "Product 17",
    "category": "Clothing",
    "removed": 0
  },
  {
    "sku": "SKU-018",
    "parentsku": "ParentSKU-018",
    "size": "Small",
    "gender": "Unisex",
    "price": 24.99,
    "cost": 15.99,
    "codebar": "8901234567",
    "name": "Product 18",
    "category": "Accessories",
    "removed": 0
  },
  {
    "sku": "SKU-019",
    "parentsku": "ParentSKU-019",
    "size": "Medium",
    "gender": "Male",
    "price": 32.99,
    "cost": 18.99,
    "codebar": "9012345678",
    "name": "Product 19",
    "category": "Clothing",
    "removed": 0
  },
  {
    "sku": "SKU-020",
    "parentsku": "ParentSKU-020",
    "size": "Large",
    "gender": "Female",
    "price": 39.99,
    "cost": 23.99,
    "codebar": "0123456789",
    "name": "Product 20",
    "category": "Clothing",
    "removed": 0
  }
]
;

const sendDataToAPI = async () => {
  try {
    const response = await axios.post(apiUrl, productData);
    console.log('Datos enviados exitosamente:', response.data);
  } catch (error) {
    console.error('Error al enviar datos:', error);
  }
};

export default sendDataToAPI;
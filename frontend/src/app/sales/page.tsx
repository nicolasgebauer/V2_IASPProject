"use client";
import Navbar from '../components/general/Navbar';
import Sidebar from '../components/general/Sidebar';
import "./../globals.css"
import Link from 'next/link';
import "./../products/products.css";
import CreateProduct from '../components/create/ProductModal';
import SalesTable from '../components/tables/SalesTable';

export default function Products() {
  return (
    <div className="container-fluid">
      <Navbar /> 

      <Sidebar/>
      <div className="container-modal"><CreateProduct/></div>
      <h2>Ventas</h2>
      <div className="container-table"><SalesTable/></div>
        
        
      </div>
    
  )
}


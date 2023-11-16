"use client";
import Navbar from '../components/general/Navbar';
import Sidebar from '../components/general/Sidebar';
import "./../globals.css"
import "./../products/products.css";
import SalesTable from '../components/tables/SalesTable';

export default function Products() {
  return (
    <div className="container-fluid">
      <Navbar /> 

      <Sidebar/>
      <h2>Ventas</h2>
      <div className="container-table"><SalesTable /></div>
        
        
      </div>
    
  )
}


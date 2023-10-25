


"use client";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import "./../globals.css"
import ProductsTable from '../components/ProductTable';
import Link from 'next/link';
import "./products.css";
import {NextUIProvider} from "@nextui-org/react";
import CreateModal from '../components/CreateModal';

export default function Products() {
  return (
    <div className="container-fluid">
      <Navbar /> 

      <Sidebar/>
      <h2>Productos</h2>
      
        <ProductsTable />
        
      </div>
    
  )
}


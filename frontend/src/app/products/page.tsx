


"use client";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import "./../globals.css"
import ProductsTable from '../components/ProductTable';
import Link from 'next/link';
import "./products.css";
import {NextUIProvider} from "@nextui-org/react";

export default function Products() {
  return (
    <div className="container-fluid">
      <Navbar /> 

      <Sidebar/>
      <h1>Productos</h1>
        <ProductsTable />
        
      </div>
    
  )
}


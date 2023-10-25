


"use client";
import Navbar from '../components/general/Navbar';
import Sidebar from '../components/general/Sidebar';
import "./../globals.css"
import ProductsTable from '../components/tables/ProductTable';
import Link from 'next/link';
import "./products.css";
import {NextUIProvider} from "@nextui-org/react";
import CreateProduct from '../components/ProductModal';


export default function Products() {
  return (
    <div className="container-fluid">
      <Navbar /> 

      <Sidebar/>
      <div className="container-modal"><CreateProduct/></div>
      <div className="container-modal"><AddProductsFromCSV/></div>
      <h2>Productos</h2>
      <div className="container-table"><ProductsTable /></div>
      </div>
    
  )
}





"use client";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import "./../globals.css"
import ProductsTable from '../components/ProductTable';
import Link from 'next/link';
import "./products.css";
import {NextUIProvider} from "@nextui-org/react";
import CreateProduct from '../components/ProductModal';
import AddProductsFromCSV from '../components/AddProductsFile';


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


"use client";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import "./../globals.css"
import InventoryTable from '../components/InventoryTable';
import Link from 'next/link';
import "./../products/products.css";
import {NextUIProvider} from "@nextui-org/react";
import CreateInventory from '../components/CreateInventory';
export default function Inventory() {
  return (
    <div className="container-fluid">
      <Navbar /> 

      <Sidebar/>
      <div className="container-modal"><CreateInventory/></div>
      <h1>Inventario</h1>
        <InventoryTable />
        
      </div>
    
  )
}


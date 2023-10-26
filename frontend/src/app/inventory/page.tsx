"use client";
import Navbar from '../components/general/Navbar';
import Sidebar from '../components/general/Sidebar';
import "./../globals.css"
import InventoryTable from '../components/tables/InventoryTable';
import Link from 'next/link';
import "./../products/products.css";
import {NextUIProvider} from "@nextui-org/react";
import CreateInventory from '../components/create/CreateInventory';
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


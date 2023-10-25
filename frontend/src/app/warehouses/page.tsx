"use client";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import "./../globals.css"
import WarehouseTable from '../components/WarehouseTable';
import Link from 'next/link';
import {NextUIProvider} from "@nextui-org/react";
import CreateModal from '../components/CreateModal';

export default function Warehouses() {
    return (
      <div className="container-fluid">
        <Navbar /> 
  
        <Sidebar/>
        <h2>Bodega</h2>
        
          <WarehouseTable />
          
        </div>
      
    )
  }
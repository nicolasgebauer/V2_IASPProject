"use client";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './warehouses.css';
import WarehouseTable from '../components/WarehouseTable';
import Link from 'next/link';
import {NextUIProvider} from "@nextui-org/react";
import CreateWarehouse from '../components/WarehouseModal';

export default function Warehouses() {
    return (
   
      <div className="container-fluid">
        <Navbar /> 
  
        <Sidebar/>
        <div className="container-modal"><CreateWarehouse/></div>
        <h2>Bodega</h2>
        <div className="table-warehouse">
        <WarehouseTable />
        </div>
        
          
        </div>
        
    )
  }
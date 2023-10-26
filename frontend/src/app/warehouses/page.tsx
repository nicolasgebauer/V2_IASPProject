"use client";
import Navbar from '../components/general/Navbar';
import Sidebar from '../components/general/Sidebar';
import './warehouses.css';
import WarehouseTable from '../components/tables/WarehouseTable';
import Link from 'next/link';
import {NextUIProvider} from "@nextui-org/react";
import CreateWarehouse from '../components/create/WarehouseModal';

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
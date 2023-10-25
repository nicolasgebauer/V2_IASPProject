


"use client";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import "./../globals.css"
import "./products.css";
import {NextUIProvider} from "@nextui-org/react";
import CreateModal from '../components/IntegrationModal';
import IntegrationTable from '../components/MantainersTable';
export default function Mantainers() {
  return (
    <NextUIProvider>
    <div className="container-fluid">
      <Navbar />        
      <Sidebar/>
      <div className="container-modal"><CreateModal/></div>
      <IntegrationTable />
      
         
    </div>
    </NextUIProvider>
  )
}





"use client";
import Navbar from '../components/general/Navbar';
import Sidebar from '../components/general/Sidebar';
import "./../globals.css"
import "./products.css";
import {NextUIProvider} from "@nextui-org/react";
import IntegrationTable from '../components/tables/MantainersTable';
import CreateModal from '../components/create/IntegrationModal';
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

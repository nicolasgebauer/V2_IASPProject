


"use client";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import "./../globals.css"
import ProductsTable from '../components/ProductTable';
import Link from 'next/link';
import "./products.css";
import {NextUIProvider} from "@nextui-org/react";
export default function Mantainers() {
  return (
    <NextUIProvider>
    <div className="container-fluid">
      <Navbar /> 
      <div className="container">
        <div className="big-container">
          <div className="table-container">
            <Sidebar/>
          </div>
        <ProductsTable />
        </div>
      </div>
      

       
    </div>
    </NextUIProvider>
  )
}


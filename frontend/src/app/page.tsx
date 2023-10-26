"use client";
import Navbar from './components/general/Navbar';
import Sidebar from './components/general/Sidebar';




import "./globals.css"



export default function Home() {
  return (

    <div className="container-fluid">
      <Navbar /> 
  
      <div className="container">
        <div className="menu-container">
          <div className="sidebar-container">
            <Sidebar/>
          </div>

        </div>
      </div>
      

       
    </div>
  
  )
}


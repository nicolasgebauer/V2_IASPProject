
"use client";
import { useState } from 'react';
import styled, { css } from "styled-components";
import { darkTheme } from "../styles/theme";
import { BsFileBarGraph } from 'react-icons/bs';
import {AiOutlineHome} from 'react-icons/ai';
import {SiHomeassistantcommunitystore} from 'react-icons/si';
import {MdMapsHomeWork} from 'react-icons/md';
import {BsCardList} from 'react-icons/bs';
import Link from 'next/link';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BiSolidDownArrow} from 'react-icons/bi'
const Line = styled.div`
  border-top: 1px solid #ccc; 
`;

const SidebarWrapper = styled.div`
  position: fixed;
  top: 63px;
  left: 0;
  height: 100vh;
  width: 220px;;
  padding-top: 1rem;
  overflow: auto;
  padding-bottom: 0rem;
  transition: all 0.3s;
  background: ${darkTheme.darkBlue};
  &::-webkit-scrollbar {
    width: 0;
  }

  .icon {
    display: flex;
    align-items: center;
    padding: 1rem 0;
    margin-top:0rem;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
    font-size: 0.4rem;
    font-family: ${darkTheme.font}, sans-serif;
    color: ${darkTheme.white};
    
  }

  .icon:not(.hover-disable):hover {
    background: ${darkTheme.grey};
    cursor: pointer;
  }
  .list-title:not(.hover-disable):hover {
    background: ${darkTheme.grey};
    cursor: pointer;
  }

  .active div {
    cursor: pointer;
  }

  h1 {
    color: ${darkTheme.white};
    font-size: 1.2rem;
    font-family: ${darkTheme.font};
    margin-left: 0.3rem;
    
  }

  h2 {
    color: ${darkTheme.white};
    font-size: 0.7rem;
    font-family: ${darkTheme.font};
    margin-left: 1rem;
    
  }
  .icon span {
    position: relative;
    top: 0px;
  }

  }
  .list-subitems{
    background: ${darkTheme.darkBlue};
    margin-left: 0rem;
    margin-top: 0rem;
    font-family: ${darkTheme.font}, sans-serif;


  }
  .subitem{
 
    margin-left: 4rem;
    margin-top: 0rem;
    font-size: 1.2rem;
  }
  .subitem:not(.hover-disable):hover {
    background: ${darkTheme.secondaryColor};
    cursor: pointer;
  }

  .list-title{
    display: flex;
    align-items: center;
    padding: 1rem 0;
    margin-top:0rem;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
    font-size: 0.4rem;
    font-family: ${darkTheme.font}, sans-serif;
    color: ${darkTheme.white};
  }
`;


const Sidebar = ({}) => {
  const [showSubitems, setShowSubitems] = useState(false);
  const toggleSubitems = () => {
    setShowSubitems(!showSubitems);
  };
  return (
    <SidebarWrapper>
    <Line />
    <Line />
    <Stack gap={5}>
      <div className="icon">
        <h1><AiOutlineHome /></h1> <h1>Inicio</h1>
      </div>
      <div className="icon">
        <h1><BsFileBarGraph /></h1><h1>  Dashboard</h1> 
      </div>
      <div className="icon">
        <h1><SiHomeassistantcommunitystore/></h1><h1>  Minorista</h1>
      </div>
      <Link href="/products">
        <div className="icon">
          <h1><MdMapsHomeWork/></h1> <h1>Mantenedores</h1>
        </div>
      </Link>
      <div className="item1" onClick={toggleSubitems}>
        
          <div className="icon"><h1><BsCardList/> </h1><h1> General</h1><h2><BiSolidDownArrow/></h2></div>
            <div className="sub-items">
              {showSubitems && (
                <div className="list-subitems">
                  <Link href="/products">
                    <div className="subitem">Productos</div>
                  </Link>
                  <Link href="/inventory">
                    <div className="subitem">Inventario</div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        
    
    </Stack>
    </SidebarWrapper>
  );
};

export default Sidebar;

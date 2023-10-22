
"use client";
import styled, { css } from "styled-components";
import { darkTheme } from "../styles/theme";
import { BsFileBarGraph } from 'react-icons/bs';
import { Mohave } from "next/font/google";
import {AiOutlineHome} from 'react-icons/ai';
import {SiHomeassistantcommunitystore} from 'react-icons/si';
import {MdMapsHomeWork} from 'react-icons/md';
import {BsCardList} from 'react-icons/bs';

const Line = styled.div`
  border-top: 1px solid #ccc; 
  margin-top: 10px;
  margin-bottom: 20px;
`;

const roboto = Mohave({
  weight: ["300","400"],
  subsets:["latin"],
}
);

const SidebarWrapper = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  height: 100vh;
  width: 220px;;
  padding-top: 1rem;
  overflow: auto;
  padding-bottom: 1.5rem;
  transition: all 0.3s;
  z-index: 2;
  background: ${darkTheme.darkBlue};
  &::-webkit-scrollbar {
    width: 0;
  }

  .icon {
    display: flex;
    align-items: center;
    padding: 1rem 0;
    margin-top:1rem;
    padding-left: 1.5rem;
    margin-bottom: 1rem;
    font-size: 0.4rem;
    font-family: ${darkTheme.font}, sans-serif;
    color: ${darkTheme.white};
    
  }

  .icon:not(.hover-disable):hover {
    background: ${darkTheme.white};
    cursor: pointer;
    color: ${darkTheme.black};
  }

  .active div {
    background: ${darkTheme.white};
    cursor: pointer;
    font-color: ${darkTheme.black};
    color: ${darkTheme.black};
  }

  h1 {
    color: ${darkTheme.white};
    font-size: 1.2rem;
    font-family: ${darkTheme.font};
  }

  .icon span {
    padding-left: 10rem;
    position: relative;
    top: 1px;
    color: ${darkTheme.black};
  }

  }
`;

const Sidebar = ({}) => {

  return (
    <SidebarWrapper>
        <Line />
    <div>
      <div className="icon">
        <h1><AiOutlineHome /></h1> <h1>Inicio</h1>
      </div>
      <div className="icon">
      <h1><BsFileBarGraph /></h1><h1>  Dashboard</h1> 
      </div>
      <div className="icon">
      <h1><BsCardList/></h1><h1>  General</h1>
      </div>
      <div className="icon">
      <h1><SiHomeassistantcommunitystore/></h1><h1>  Minorista</h1>
      </div>
      <div className="icon">
      <h1><MdMapsHomeWork/></h1> <h1>Mantenedores</h1>
      </div>
    </div>
    </SidebarWrapper>
  );
};

export default Sidebar;

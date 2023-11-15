
"use client";
import styled from 'styled-components';
import { darkTheme } from '../../styles/theme';
import 'bootstrap/dist/css/bootstrap.min.css';


const Wrapper = styled.div`
  background:${darkTheme.orange};
  margin-left: -15px;
  width: 101.5%;
  height: 80px;
  margin-right: -15px;
  display: flex;
  align-items: center; 

  .h1{
    top: 1px;
    color: ${darkTheme.white};
    width: 150%;
    font-weight: bold; 
    font-size: 2em; 
  }

`;

const Navbar = () => {

  return (
   <Wrapper>
    
        <div className="p-2"> 
              <h1>
                Sales
                </h1>
        </div>

    </Wrapper>

  );
};

export default Navbar;
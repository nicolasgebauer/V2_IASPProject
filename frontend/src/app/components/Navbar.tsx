
"use client";
import styled from 'styled-components';
import { darkTheme } from '../styles/theme';
import Link from 'next/link';
import { FaUserAlt } from 'react-icons/fa';
import sendDataToAPI from './../functions/POSTData';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';

const Wrapper = styled.div`
  background:${darkTheme.darkBlue};
  margin-left: -15px;
  width: 101.5%;
  height: 80px;
  margin-right: -15px;

  .logo span {
    position: relative;
    top: 1px;
    color: ${darkTheme.white};
    width: 150%;
    font-weight: bold; 
    font-size: 2em; 
  }
  .icon {
    color: ${darkTheme.white};
  }


  @media screen and (max-width: 1093px) {
    .toggle-navhandler {
      display: block;
    }
  }

  @media screen and (max-width: 1000px) {
    input {
      width: 400px;
    }
  }

  @media screen and (max-width: 850px) {
    input {
      width: 280px;
    }
  }

  @media screen and (max-width: 500px) {
    .toggle-navhandler {
      display: none;
    }

    li svg {
      width: 30px;
      height: 30px;
      margin-right: 1.7rem;
      position: relative;
      top: 0px;
    }
  }
`;

const Navbar = () => {
  const handleSendDataClick = () => {
    sendDataToAPI();
  };
  return (
   <Wrapper>
      <Stack direction="horizontal" gap={3}>
        <div className="p-2"> 
          <Link href="/">
            <div className="logo flex-row">
              <span>
                Hope Solutions
              </span>
            </div>
          </Link>
        </div>
        <div className="p-2 ms-auto"> 
          <Link href="/home">
           <FaUserAlt />
          </Link>
        </div>
        <div className="p-2"> 
          <ul>
            <div className="icon">
              <button onClick={handleSendDataClick}>Enviar Datos</button>
            </div>
          </ul>
        </div>
      </Stack>
    </Wrapper>

  );
};

export default Navbar;
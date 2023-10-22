
"use client";
import styled from 'styled-components';
import { darkTheme } from '../styles/theme';
import Link from 'next/link';
import { FaUserAlt } from 'react-icons/fa';

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 8.5%;
  z-index: 99;
  padding: 0.7rem 1.5rem;
  background:${darkTheme.darkBlue};


  input {
    width: 150%;
  }

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
    margin-right: 2rem;
    margin-left: 5rem;
    margin-top: 1rem;
  }
  ul {
    list-style: none;
    display: flex;
    position: relative;
    top: 2px;
  }

  li svg {
    margin-right: 1.7rem;
    position: relative;
    top: 3px;
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

  return (
    <Wrapper>
      <Link href="/home">
      <div className="logo flex-row">
        <span>
        Hope Solutions
        </span>
      </div>
      </Link>
      <ul>
      <div className="icon">
           <FaUserAlt />
          </div>
      </ul>
    </Wrapper>
  );
};

export default Navbar;
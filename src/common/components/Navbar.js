import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import scriptsNav from "../constants/scriptsList.js";
import { HighlightedItem } from './Contents.js';

const LogoHome = styled.div`
  & {
    color: var(--theme-white);
    text-decoration: none;
    font-weight: bold;
    font-size: 1rem;
    letter-spacing: -0.1rem;
    transition: all 0.2s;

    @media (min-width: 1200px) {
      font-size: 1.5rem;
      letter-spacing: -0.1rem;
    }
  }

  &>:first-child {
    color: var(--theme-red);
    margin-right: 0.3rem;
  }
  

  &:hover {
    transform: translateX(-0.5rem);
  }
`;

export default function Navbar() {

  return (
    <nav className='container py-2 my-2 d-flex justify-content-between align-items-center'>
      <NavLink to="/" style={{textDecoration: 'none'}}>
        <LogoHome className="my-lg-2">
          <span>CRISPY</span>
          <span>SCRIPTS</span>
        </LogoHome>
      </NavLink>
      
      <div className='d-flex'>
        {scriptsNav.map((script, index) => (
          <NavLink
            to={{
              pathname: "/",
              search: `?project_name=${script.repositoryName}`,
              state: { fromDashboard: true }
            }}
            className={`${index ? 'ms-3' : ''}`}
            // className={({ isActive }) => `${isActive ? 'active-route': ''} ${index !== scriptsNav.length -1 ? 'me-2 me-lg-3' : ''}`}
            key={index}
            style={{textDecoration: 'none'}}
          >
            <HighlightedItem className="script-nav">
              {script.name}
            </HighlightedItem>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
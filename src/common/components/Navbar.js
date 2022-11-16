import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import scriptsNav from "../constants/scriptsList.js";

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

const LinkItem = styled.div`
  &, & > * {
    color: ${props => props.isCurrent ? 'var(--theme-red)' : 'var(--theme-white)'};
    text-decoration: none;
    font-weight: bold;
    font-size: 0.8rem;
    letter-spacing: -0.1rem;
    transition: all 0.2s;

    @media (min-width: 1200px) {
      font-size: 1.2rem;
      letter-spacing: -0.1rem;
    }
  }

  &:hover {
    color: ${props => !props.isCurrent ? 'var(--theme-red)' : 'var(--theme-white)'};
    transform: translateX(-0.5rem);
  }
`;

export default function Navbar() {

  return (
    <nav className='container py-2 my-2 d-flex justify-content-between align-items-center'>
      <Link to="/" style={{textDecoration: 'none'}}>
        <LogoHome className="my-lg-2">
          <span>CRISPY</span>
          <span>SCRIPTS</span>
        </LogoHome>
      </Link>
      
      {scriptsNav.map((script, index) => (
        <Link
          to={`/scripts/?project_name=${script.repositoryName}`}
          className={index !== scriptsNav.length -1 ? 'me-2 me-lg-3' : ''}
          key={index}
          style={{textDecoration: 'none'}}
        >
          <LinkItem isCurrent={false}>
            {script.name}
          </LinkItem>
        </Link>
      ))}
    </nav>
  )
}
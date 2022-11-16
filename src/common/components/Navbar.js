import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoHome = styled.div`
  & {
    color: #e6e6e6;
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

  &:hover {
    transform: translateX(-1rem);
  }
`;

const LinkItem = styled.div`
  &, & > * {
    color: ${props => props.isCurrent ? 'hsl(0 60% 50%)' : '#e6e6e6'};
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
    color: hsl(0 60% 90%);
    transform: translateX(-0.5rem);
  }
`;

export default function Navbar({currentRepositoryName}) {
  const scriptsNav = [
    {
      name: 'SHELL',
      repositoryName: 'shell-automations'
    },
  ];

  

  return (
      <div className='w-100 mt-2'>
        <nav className='container py-2 d-flex justify-content-between align-items-center'>
          <Link to="/" style={{textDecoration: 'none'}}>
            <LogoHome>
              CRISPY SCRIPT
            </LogoHome>
          </Link>
          
          {scriptsNav.map((script, index) => (
            <Link
              to={`/?project=${script.repositoryName}`}
              className={index !== scriptsNav.length -1 ? 'me-2 me-lg-3' : ''}
              key={index}
              style={{textDecoration: 'none'}}
            >
              <LinkItem isCurrent={script.repositoryName === currentRepositoryName}>
                {script.name}
              </LinkItem>
            </Link>
          ))}
        </nav>
      </div>
  )
}
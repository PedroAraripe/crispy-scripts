import React from 'react';
import styled from 'styled-components';

const LogoHome = styled.a`
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
`

export default function Navbar() {
  const scriptsNav = [
    {
      name: 'SHELL',
    },
    {
      name: 'PYTHON',
    },
    {
      name: 'LUA',
    },
  ];


  return (
    <div className='w-100'>
      <div>
        <ul className="container py-2 mb-0 p-0 d-flex justify-content-between align-items-center">
          <li>
            <LogoHome className="logo-home" href="https://pedroararipe.github.io/portfolio/#">
              CRISPY SCRIPT
            </LogoHome>
          </li>

          <li>
            <ul className='d-flex'>
              {scriptsNav.map((script, index) => (
                <li className={index !== scriptsNav.length -1 ? 'me-2 me-lg-3' : ''} key={index}>
                  {script.name}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}
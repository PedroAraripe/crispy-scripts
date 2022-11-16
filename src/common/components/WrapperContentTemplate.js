import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

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

  &>:first-child {
    color: hsl(0 60% 50%);
    margin-right: 0.3rem;
  }
  

  &:hover {
    transform: translateX(-0.5rem);
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

export default class WrapperContent extends Component {

  render() {
    return (
      <div className='container bg-danger'>
        {this.props.children}
      </div>
    )
  }
}
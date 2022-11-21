import React, { Component } from 'react';
import styled from 'styled-components';
import scriptsList from '../constants/scriptsList';

const DivisorColumn = styled.div`
    opacity: 0.6;
    background-color: white;
    height: 1.5px;
    width: 100%;

    @media(min-width: 1199px) {
        height: 100%;
        width: 1.5px;
    }
`;
export default class WrapperContent extends Component {

  render() {
    return (
      <div className='container bg-dark py-4' style={{borderRadius: '10px'}}>
        <div className="px-2 px-lg-4">
          <div className="row">
              <div className="col-lg-9 px-lg-4">
                {this.props.children}
              </div>
                    
            <div className="px-lg-2 col-lg-3 d-lg-flex">
                <DivisorColumn className='mb-4 mb-lg-0'/>

                <div className='px-lg-4 py-2 py-lg-4'>
                    <div>
                        <h5 className='h5 mb-3 mb-lg-4'>
                            Also check out:
                        </h5>
                    </div>

                    <ul className='p-0'>
                        <li className='pb-2'>
                            <div className='h6'>
                                <span>1.</span> <a
                                    href="https://github.com/PedroAraripe/crispy-scripts"
                                    style={{color: "var(--theme-red)", textUnderlineOffset: '0.3rem', textDecorationThickness: '0px'}}
                                    target="_blank"
                                    rel="noreferrer"
                                    className='text-uppercase'
                                >
                                    Crispy Scripts 
                                </a>
                            </div>
                        </li>

                        {scriptsList.map((script, index) => (
                            <div className='h6' key={script.name}>
                                <span>{index+2}.</span> <a
                                    href={`https://github.com/PedroAraripe/${script.repositoryName}`}
                                    style={{color: "var(--theme-red)", textUnderlineOffset: '0.3rem', textDecorationThickness: '0px'}}
                                    target="_blank"
                                    rel="noreferrer"
                                    className='text-uppercase'
                                >
                                    {script.name}
                                </a>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
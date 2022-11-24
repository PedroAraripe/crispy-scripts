import React from 'react';

import styled from 'styled-components'

const WrapperFooter = styled.footer`
    font-size: .7rem;
    color: #b7b2b2;
`

function FooterSection() {
    return (
        <WrapperFooter className='p-5 d-flex align-items-center justify-content-center text-center text-capitalize'>
            <span style={{color: "gray"}}>
                Designed & Built by
            </span>
            <a href="https://github.com/PedroAraripe" style={{textDecoration: 'none', color: "gray"}}>
                Lucas Araripe
            </a>
        </WrapperFooter>
    );
  }
  
  export default FooterSection;
  

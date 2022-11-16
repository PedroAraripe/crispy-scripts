import React from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';

import './styles/global.css';

import App from './App';
import Footer from './common/components/Footer';
import { HashRouter as Router } from 'react-router-dom';

const WrapperContainerX = styled.div`
  max-width: 100vw;
  overflow: clip;
`;

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WrapperContainerX>
      <Router>
        <App />
      </Router>
    <Footer />
    </WrapperContainerX>
  </React.StrictMode>
);
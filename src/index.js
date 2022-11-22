import React from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import store from './store';

import './styles/global.css';

import App from './App';
import Footer from './common/components/Footer';

const WrapperContainerX = styled.div`
  max-width: 100vw;
  overflow: clip;
`;

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WrapperContainerX>
      <Provider store={store}>
          <App />
        <Footer />
      </Provider>   
    </WrapperContainerX>
  </React.StrictMode>
);
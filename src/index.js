import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react'

import Routing from './routes/web';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
        <Routing />
  </ChakraProvider>
);



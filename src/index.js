import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { CartContextProvider } from './context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <CartContextProvider>
    <AuthContextProvider>
      <App/>
    </AuthContextProvider>
    </CartContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
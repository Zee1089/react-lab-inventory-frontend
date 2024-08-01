import { BrowserRouter } from 'react-router-dom'; // import BrowserRouter
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "./index.css"
import './components/NavBar/NavBar.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

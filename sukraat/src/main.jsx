import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import 'bootstrap/dist/css/bootstrap.min.css'; 
import App from './App';   
 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* Wrap your app in BrowserRouter */}
    <App />
  </BrowserRouter>
);
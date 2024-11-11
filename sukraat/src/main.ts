import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import BlackHole from './BlackHole.tsx'; 

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <h1>Black Hole Simulation</h1>
    <BlackHole /> 
  </React.StrictMode>
);
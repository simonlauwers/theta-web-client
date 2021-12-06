import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { version } from './../package.json';
import AuthProvider from './contexts/AuthProvider';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    {console.log("Running Thèta webclient version " + version)}
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>

    
  </React.StrictMode>,
  document.getElementById('root')
);

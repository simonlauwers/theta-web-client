import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { version } from './../package.json';

ReactDOM.render(
  <React.StrictMode>
    {console.log("Running Thèta webclient version " + version)}

      <App />
    
  </React.StrictMode>,
  document.getElementById('root')
);

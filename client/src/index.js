import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Importação do Materialize CSS
 */
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import './index.css';

import App from './App';

M.AutoInit();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

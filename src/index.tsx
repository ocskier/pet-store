import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { GlobalProvider } from './context/Store';

import './index.css';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <StrictMode>
    <GlobalProvider>
      <Router>
        <App />
      </Router>
    </GlobalProvider>
  </StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();

import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { GlobalProvider } from './context/Store';

import './index.css';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();

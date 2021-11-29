//  React imports
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// App import
import App from './App';

// Global State imports
import { GlobalProvider } from './context/Store';

// Style imports
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Analytics import
import reportWebVitals from './reportWebVitals';

// Wrapping our app with the global state and browser client-side router
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

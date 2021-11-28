//  React hook imports
import { useEffect } from 'react';

// Dependency imports
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// MUI imports (Material-UI)
import { styled } from '@mui/material/styles';

// Local permission routes
import { ProtectedRoute, PublicRoute } from './routes/Routes';

// Page and component imports
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from './components/Login';
import { Dashboard } from './pages/Dashboard';

// Global State imports
import { useGlobalContext } from './context/Store';
import { types } from './context/actions';

// Utility imports
import { readUserPersistence } from './utils/localStorage';
import { toast } from './utils/toast';

// CSS imports
import './App.css';

// Custom styled container for hero banner
const StyledHero = styled('div')(() => ({
  background:
    'url(https://res.cloudinary.com/file-upload-multer-cloudinary/image/upload/v1637773737/t-r-photography-TzjMd7i5WQI-unsplash_hwvycx.jpg)',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  minHeight: '11rem',
  opacity: 0.92,
}));

const App = () => {
  // Snapshot of the global state
  const {
    state: { loggedIn },
    dispatch,
  } = useGlobalContext();

  // Side effect that loads and updates global state with previously
  // logged in user
  useEffect(() => {
    const user = readUserPersistence();
    Object.keys(user).length && dispatch({ type: types.ME, payload: user });
    Object.keys(user).length && toast('Already logged in!', 600);
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <StyledHero />
      {/* Centered toast informational alert for user feedback */}
      <ToastContainer />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              // Anyone can access the Home page
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              // Anyone can access the Login page
              <PublicRoute auth={loggedIn} restricted={true}>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              // Only logged  in users can access Dashboard view
              <ProtectedRoute auth={loggedIn}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;

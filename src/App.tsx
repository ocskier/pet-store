import { useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { styled } from '@mui/material/styles';

import { ProtectedRoute, PublicRoute } from './routes/Routes';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from './components/Login';
import { Dashboard } from './pages/Dashboard';

import { useGlobalContext } from './context/Store';
import { types } from './context/actions';

import { readUserPersistence } from './utils/localStorage';
import { toast } from './utils/toast';

import './App.css';
import { getAllPets } from './utils/api';

const StyledHero = styled('div')(() => ({
  background:
    'url(https://res.cloudinary.com/file-upload-multer-cloudinary/image/upload/v1637773737/t-r-photography-TzjMd7i5WQI-unsplash_hwvycx.jpg)',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  minHeight: '11rem',
  opacity: 0.92,
}));

const App = () => {
  const {
    state: { loggedIn },
    dispatch,
  } = useGlobalContext();

  const getPets = useCallback(async () => {
    try {
      const res = await getAllPets();
      const pets = await res.json();
      console.log(pets);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const user = readUserPersistence();
    Object.keys(user).length && dispatch({ type: types.ME, payload: user });
    Object.keys(user).length && toast('Already logged in!', 600);
    getPets();
  }, [dispatch, getPets]);

  return (
    <div className="App">
      <Header />
      <StyledHero />
      <ToastContainer />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute auth={loggedIn} restricted={true}>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
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

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute, PublicRoute } from './routes/Routes';

import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from './components/Login';
import { Dashboard } from './pages/Dashboard';

import { useGlobalContext } from './context/Store';
import { types } from './context/actions';

import { readUserPersistence } from './utils/localStorage';

import './App.css';

const App = () => {
  const {
    state: { loggedIn },
    dispatch,
  } = useGlobalContext();

  useEffect(() => {
    const user = readUserPersistence();
    Object.keys(user).length && dispatch({ type: types.ME, payload: user });
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
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

import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute, PublicRoute } from './routes/Routes';

import { useGlobalContext } from './context/Store';
import { types } from './context/actions';

import { readUserPersistence, updateUserPersistence } from './utils/localStorage';

import './App.css';

const App = () => {
  const {
    state: { loggedIn },
    dispatch,
  } = useGlobalContext();

  useEffect(() => {
    // updateUserPersistence({ username: 'test', password: 'password', permissions: 'customer' }); // testing loggedIn
    const user = readUserPersistence();
    Object.keys(user).length && dispatch({ type: types.ME, payload: user });
  }, [dispatch]);

  return (
    <div className="App">
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <p>Home Page</p>
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute auth={loggedIn} restricted={true}>
                <p>Login View</p>
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute auth={loggedIn}>
                <p>Dashboard</p>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;

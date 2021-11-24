import { useEffect } from 'react';

import { useGlobalContext } from './context/Store';
import { types } from './context/actions';

import { readUserPersistence, updateUserPersistence } from './utils/localStorage';

import './App.css';

const App = () => {
  const {
    state: { loggedIn },
    dispatch,
  } = useGlobalContext();
  console.log(loggedIn);
  useEffect(() => {
    updateUserPersistence({ username: 'test', password: 'password', permissions: 'customer' }); // testing loggedIn
    const user = readUserPersistence();
    Object.keys(user).length && dispatch({ type: types.ME, payload: user });
  }, [dispatch]);

  return <div className="App">{String(loggedIn)}</div>;
};

export default App;

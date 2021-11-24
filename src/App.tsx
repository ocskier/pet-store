import { useGlobalContext } from './context/Store';

import './App.css';

const App = () => {
  const {
    state: { loggedIn },
    dispatch,
  } = useGlobalContext();

  return <div className="App"></div>;
};

export default App;

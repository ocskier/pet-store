//  React hook imports
import { createContext, FC, useContext, useReducer } from 'react';

// Matching reducer import
import reducer from './reducer';

// Type and interface imports
import { GlobalContextInterface, ProvProps } from '../types/globalTypes';

// Create App initial global  state value (no pets or logged in user)
const initialState = {
  loggedIn: false,
  user: null,
  pets: [],
};

// Create a global context with initial state and empty dispatch
const GlobalContext = createContext<GlobalContextInterface>({
  state: initialState,
  dispatch: () => {},
});

// Destructure global Provider from context
const { Provider } = GlobalContext;

// Custom hook for accessing the global state around the app
export const useGlobalContext = () => useContext(GlobalContext);

// Custom Provider component to wrap around app with initial state and
// defined dispatch
export const GlobalProvider: FC<ProvProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

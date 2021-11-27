import { createContext, FC, useContext, useReducer } from 'react';

import reducer from './reducer';

import { GlobalContextInterface, ProvProps } from '../types/globalTypes';

const initialState = {
  loggedIn: false,
  user: null,
  pets: [],
};

const GlobalContext = createContext<GlobalContextInterface>({
  state: initialState,
  dispatch: () => {},
});

const { Provider } = GlobalContext;

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider: FC<ProvProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

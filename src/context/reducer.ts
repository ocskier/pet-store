import { Action, State } from '../types/globalTypes';

const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'LOGIN':
      return { ...state, loggedIn: true, user: { ...payload } };
    case 'LOGOUT':
      return { ...state, loggedIn: false, user: null };
    case 'ME':
      return { ...state, loggedIn: true, user: { ...payload } };
    default:
      return state;
  }
};

export default reducer;

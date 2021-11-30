// Type and interface imports
import { Action, State } from '../types/globalTypes';

// Use state and action value to update global state
const reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case 'LOGIN':
      // spread user payload to new state, change login to true
      return { ...state, loggedIn: true, user: { ...payload } };
    case 'LOGOUT':
      // empty user state value, change login to false
      return { ...state, loggedIn: false, user: null };
    case 'ME':
      // spread persisted user payload to new state, change login to true
      return { ...state, loggedIn: true, user: { ...payload } };
    case 'SET_PETS':
      // spread pets array value to new state
      return { ...state, pets: [...payload] };
    default:
      // no match return old state
      return state;
  }
};

export default reducer;

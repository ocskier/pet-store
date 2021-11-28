// Action types
export const types = {
  //  LOGIN:
  //  takes a user object as payload with username and password parameters
  //  updates user state value
  //  changes auth state loggedIn to true
  LOGIN: 'LOGIN',

  //  LOGOUT:
  //  updates user state to null
  //  changes auth state loggedIn to false
  LOGOUT: 'LOGOUT',

  //  ME:
  //  takes a user profile from ls persistence as payload
  //  updates user state value
  //  changes auth state loggedIn to true
  ME: 'ME',

  //  SET_PETS:
  //  takes a new pets array as payload
  //  updates pets state value with new array
  SET_PETS: 'SET_PETS',
};

// Type and interface imports
import { Pet, User } from '../types/globalTypes';

// Stores updated user in localStorage to persist across browser sessions
export const updateUserPersistence = (user?: User) => {
  user ? window.localStorage.setItem('user', JSON.stringify(user)) : window.localStorage.removeItem('user');
};

// Reads user from localStorage if exists
export const readUserPersistence = () => {
  return JSON.parse(window.localStorage.getItem('user') || '{}');
};

// Stores updated pets in localStorage to persist across browser sessions
export const updatePetsPersistence = (pets: Pet[]) => {
  window.localStorage.setItem('pets', JSON.stringify(pets));
};

// Reads pets from localStorage if exists
export const readPetsPersistence = () => {
  return JSON.parse(window.localStorage.getItem('pets') || '{}');
};

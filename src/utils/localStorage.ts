import { Pet, User } from '../types/globalTypes';

export const updateUserPersistence = (user?: User) => {
  user ? window.localStorage.setItem('user', JSON.stringify(user)) : window.localStorage.removeItem('user');
};

export const readUserPersistence = () => {
  return JSON.parse(window.localStorage.getItem('user') || '{}');
};

export const updatePetsPersistence = (pets: Pet[]) => {
  window.localStorage.setItem('pets', JSON.stringify(pets));
};

export const readPetsPersistence = () => {
  return JSON.parse(window.localStorage.getItem('pets') || '{}');
};

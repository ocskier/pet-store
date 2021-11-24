import { User } from '../types/globalTypes';

export const updateUserPersistence = (user?: User) => {
  user ? window.localStorage.setItem('user', JSON.stringify(user)) : window.localStorage.removeItem('user');
};

export const readUserPersistence = () => {
  return JSON.parse(window.localStorage.getItem('user') || '{}');
};

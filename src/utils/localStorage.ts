import bcrypt from 'bcryptjs';

// Type and interface imports
import { Pet, User } from '../types/globalTypes';

// Stores updated user in localStorage to persist across browser sessions
export const updateUserPersistence = (user?: User) => {
  user
    ? bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
          // Store hashed password in ls
          window.localStorage.setItem('user', JSON.stringify({ ...user, password: hash }));
        });
      })
    : window.localStorage.removeItem('user');
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

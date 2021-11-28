// Type and interface imports
import { User } from '../types/globalTypes';

// Base url for the Swagger Petstore API (https://petstore.swagger.io)
const BASE_URL = 'https://petstore.swagger.io/v2';

// Custom type for input Pet object value to update a Pet, only id is non-nullable
type PetInput = {
  id: number;
  name?: string;
  status?: string;
};

// GET route to return all pets regardless of status
export const getAllPets = () => fetch(`${BASE_URL}/pet/findByStatus?status=available&status=pending&status=sold`);

// POST route to update a Pet with the new pet data
export const updateAPet = (newPetData: PetInput) =>
  fetch(`${BASE_URL}/pet/${newPetData.id}?name=${newPetData.name}&status=${newPetData.status}`, {
    method: 'POST',
  });

// GET route to login a user with object value containing username and password
export const loginUser = (newUser: User) =>
  fetch(`${BASE_URL}/user/login?username=${newUser.username}&status=${newUser.password}`);

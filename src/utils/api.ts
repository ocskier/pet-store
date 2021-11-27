const BASE_URL = 'https://petstore.swagger.io/v2';

type PetInput = {
  id: number;
  category?: string;
  name?: string;
  photo?: string;
  tags?: string;
  status?: string;
};

export const getAllPets = () => fetch(`${BASE_URL}/pet/findByStatus?status=available&status=pending&status=sold`);

export const updateAPet = (newPetData: PetInput) =>
  fetch(`${BASE_URL}/pet/${newPetData.id}?name=${newPetData.name}&status=${newPetData.status}`, {
    method: 'POST',
  });

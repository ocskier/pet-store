const BASE_URL = 'https://petstore.swagger.io/v2';

type PetInput = {
  category?: string;
  name?: string;
  photo?: string;
  tags?: string;
  status?: string;
};

export const getAllPets = () => fetch(BASE_URL + '/pet/findByStatus?status=available&status=pending&status=sold');

export const updateAPet = (petId: string, newPetData: PetInput) =>
  fetch(BASE_URL + '/pet/' + petId, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPetData),
  });

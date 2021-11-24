import { Pet } from '../types/globalTypes';

const categoriesArray = ['cat', 'kitten', 'dog', 'frog', 'fish', 'pig', 'lion', 'puppy', 'hamster', 'cow'];

export const cleanPetData = (data: any) =>
  data
    .map((pet: any) => {
      return {
        id: pet.id,
        category: pet.category?.name,
        name: pet.name,
        photo: pet.photoUrls?.[0],
        tags: pet.tags?.map((tag: { id: number; name: string }) => tag.name).join(', '),
        status: pet.status,
      };
    })
    .filter((pet: Pet, i: number, orig: Pet[]) => {
      return orig.findIndex((p: Pet) => p.id === pet.id) === i;
    })
    .filter((pet: Pet) => {
      return pet.category ? categoriesArray.some((category) => category === pet.category) : pet;
    });

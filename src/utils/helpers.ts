// Type and interface imports
import { Pet } from '../types/globalTypes';

// Valid categories available from API for future use
// const categoriesArray = ['cat', 'kitten', 'dog', 'frog', 'fish', 'pig', 'lion', 'puppy', 'hamster', 'cow'];

// An algorithm to clean the data returned from Pets API
export const cleanPetData = (data: any) =>
  data
    .map((pet: any) => {
      // filter the returned pet data for the app (convert category to string not obj,
      // first pic as primary, convert tags array to string for table)
      return {
        id: pet.id,
        category: pet.category?.name,
        name: pet.name ? pet.name : 'I need a name?!',
        photo: pet.photoUrls?.[0],
        tags: pet.tags?.map((tag: { id: number; name: string }) => tag.name).join(', '),
        status: pet.status,
      };
    })
    // remove pets that have duplicate unique ids
    .filter((pet: Pet, i: number, orig: Pet[]) => {
      return orig.findIndex((p: Pet) => p.id === pet.id) === i;
    })
    // and names (not good practice but for test purposes)
    .filter((pet: Pet, i: number, orig: Pet[]) => {
      return pet.name ? orig.findIndex((p: Pet) => p.name === pet.name) === i : pet;
    })
    // remove pets that have a placeholder string for category
    .filter((pet: Pet) => {
      return pet.category
        ? !pet.category.toLowerCase().includes('string')
        : // future use
          // categoriesArray.some((category) => category === pet.category)
          pet;
    });

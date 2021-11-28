// React hook imports
import { useState } from 'react';

// MUI imports (Material-UI)
import { LoadingButton } from '@mui/lab';

// Global State imports
import { useGlobalContext } from '../context/Store';
import { types } from '../context/actions';

import { placeAnOrder } from '../utils/api';
import { updatePetsPersistence } from '../utils/localStorage';
import { toast } from '../utils/toast';

import { Pet } from '../types/globalTypes';

export const PurchaseButton = ({ row }: { row: Pet }) => {
  const [loading, setLoading] = useState(false);
  // Snapshot of the global state
  const {
    dispatch,
    state: { pets },
  } = useGlobalContext();

  // Event handler that finds pet to purchase in data, posts order to the API
  // if successful updates the pet locally, updates global state and
  // writes over ls for persistence triggering rerender of table
  // else alerts user of error via toast
  const purchasePet = async (row: Pet) => {
    setLoading(true);
    const foundPet = pets.find((pet) => pet.id === row.id);
    if (foundPet) {
      const { id: petId } = foundPet;
      try {
        const res = await placeAnOrder({ id: Math.floor(Math.random() * 10000), petId, quantity: 1 });
        if (res.status < 400) {
          const data = await res.json();
          if (data.complete === true) {
            foundPet.status = 'sold';
            toast(`You bought ${foundPet.name} !`, 1400);
            setTimeout(() => {
              dispatch({ type: types.SET_PETS, payload: pets });
              updatePetsPersistence(pets);
              setLoading(false);
            }, 1400);
          } else {
            toast(`Could not complete order!`, 1400, 'error');
            setLoading(false);
          }
        } else {
          toast(`Network error, try again later!`, 1400, 'error');
          setLoading(false);
        }
      } catch (err) {
        toast(`Something went wrong!`, 1500, 'error');
        setLoading(false);
      }
    }
  };
  return (
    <LoadingButton loading={loading} color="success" onClick={() => purchasePet(row)} variant="outlined">
      Buy me!
    </LoadingButton>
  );
};

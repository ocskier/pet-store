// MUI imports (Material-UI)
import { FormControlLabel } from '@mui/material';

// Component imports
import { StyledFormGroup, StyledSwitch } from './Switch';

// Global State imports
import { useGlobalContext } from '../../context/Store';
import { types } from '../../context/actions';

// Utility imports
import { updateAPet } from '../../utils/api';
import { updatePetsPersistence } from '../../utils/localStorage';
import { toast } from '../../utils/toast';

// Type and interface imports
import { Pet } from '../../types/globalTypes';

export const SoldSwitch = ({ row }: { row: Pet }) => {
  // Snapshot of the global state
  const {
    dispatch,
    state: { pets },
  } = useGlobalContext();

  // Event handler that finds pet to update in data, updates the API accordingly
  // if successful updates the pet locally, updates global state and
  // writes over ls for persistence triggering rerender of table
  // else alerts user of error via toast
  const changeStatus = async (row: Pet) => {
    const foundPet = pets.find((pet) => pet.id === row.id);
    if (foundPet) {
      const { id, name, status } = foundPet;
      try {
        const res = await updateAPet({ id, name, status });
        const data = await res.json();
        if (data.code < 400) {
          foundPet.status = row.status === 'available' ? 'sold' : 'available';
          dispatch({ type: types.SET_PETS, payload: pets });
          updatePetsPersistence(pets);
        } else {
          toast(`Pet not updated in DB!`, 1400, 'error');
        }
      } catch (err) {
        toast(`Something went wrong!`, 1400, 'error');
      }
    }
  };

  return (
    row && (
      <StyledFormGroup>
        <FormControlLabel
          control={
            <StyledSwitch checked={row.status === 'available' ? false : true} onChange={() => changeStatus(row)} />
          }
          label={row.status}
        />
      </StyledFormGroup>
    )
  );
};

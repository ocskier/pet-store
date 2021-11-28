import { useCallback } from 'react';

import { FormControlLabel } from '@mui/material';

import { StyledFormGroup, StyledSwitch } from './Switch';

import { useGlobalContext } from '../../context/Store';
import { types } from '../../context/actions';

import { updateAPet } from '../../utils/api';
import { updatePetsPersistence } from '../../utils/localStorage';
import { toast } from '../../utils/toast';

import { Pet } from '../../types/globalTypes';

export const SoldSwitch = ({ row }: { row: Pet }) => {
  const {
    dispatch,
    state: { pets },
  } = useGlobalContext();

  const changeStatus = useCallback(
    async (row: Pet) => {
      const foundPet = pets.find((pet) => pet.id === row.id);
      if (foundPet) {
        try {
          const res = await updateAPet(foundPet);
          const data = await res.json();
          if (data.code < 400) {
            foundPet.status = row.status === 'available' ? 'sold' : 'available';
            dispatch({ type: types.SET_PETS, payload: pets });
            updatePetsPersistence(pets);
          } else {
            toast(`Pet not updated in DB!`, 1500, 'error');
          }
        } catch (err) {
          toast(`Something went wrong!`, 1500, 'error');
        }
      }
    },
    [dispatch, pets],
  );

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

import { Dispatch, SetStateAction } from 'react';

import { FormControlLabel } from '@mui/material';

import { StyledFormGroup, StyledSwitch } from './Switch';

export const FilterSwitch = ({ sold, setSold }: { sold: boolean; setSold: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <StyledFormGroup>
      <FormControlLabel
        control={<StyledSwitch />}
        label={sold ? 'Sold' : 'All'}
        sx={{ marginLeft: 0, marginRight: 0 }}
        onChange={() => {
          setSold(!sold);
        }}
      />
    </StyledFormGroup>
  );
};

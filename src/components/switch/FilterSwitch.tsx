//  React type imports
import { Dispatch, SetStateAction } from 'react';

// MUI imports (Material-UI)
import { FormControlLabel } from '@mui/material';

// Component imports
import { StyledFormGroup, StyledSwitch } from './Switch';

export const FilterSwitch = ({ sold, setSold }: { sold: boolean; setSold: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <StyledFormGroup>
      <FormControlLabel
        control={<StyledSwitch />}
        label={sold ? 'Sold' : 'All'}
        sx={{ marginLeft: 0, marginRight: 0 }}
        // Change Event handler that flips parent DataTable state of sold from true->false->true...
        // for filtering of admin table data
        onChange={() => {
          setSold(!sold);
        }}
      />
    </StyledFormGroup>
  );
};

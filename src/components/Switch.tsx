import { useCallback, useState } from 'react';

import { FormGroup, FormControlLabel, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Pet } from '../types/globalTypes';

const StyledFormGroup = styled(FormGroup)(() => ({ alignItems: 'center', margin: '0.25rem 0 1.25rem' }));

const SoldSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url(https://res.cloudinary.com/file-upload-multer-cloudinary/image/upload/c_scale,e_negate,h_20/v1637641191/pet-store/banner-freeuse-geldtasche-icon-free-and-money-icon-115534432646uveksxxli_zkytph.png)`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#2e1f0deb',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#2e1f0deb',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: ``,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export const SoldSwitchWithLabel = ({ row }: { row: Pet }) => {
  const [checked, setChecked] = useState(row.status === 'available' ? false : true);

  const changeStatus = useCallback((row: Pet) => {
    row.status = row.status === 'available' ? 'sold' : 'available';
    setChecked((oldChecked) => !oldChecked);
  }, []);

  return (
    row && (
      <StyledFormGroup>
        <FormControlLabel
          control={<SoldSwitch checked={checked} onChange={() => changeStatus(row)} />}
          label={row.status}
        />
      </StyledFormGroup>
    )
  );
};

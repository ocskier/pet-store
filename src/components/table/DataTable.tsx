//  React hook imports
import { FC, useCallback, useEffect, useState } from 'react';

// Dependency imports
import { ClipLoader } from 'react-spinners';

// MUI imports (Material-UI)
import { Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

// Component imports
import { Cols } from './Cols';
import { AdminCols } from './AdminCols';
import { CustomerCols } from './CustomerCols';
import { PublicCols } from './PublicCols';
import { FilterSwitch } from '../switch/FilterSwitch';

// Global State imports
import { useGlobalContext } from '../../context/Store';
import { types } from '../../context/actions';

// Utility imports
import { getAllPets } from '../../utils/api';
import { cleanPetData } from '../../utils/helpers';
import { readPetsPersistence, updatePetsPersistence } from '../../utils/localStorage';

// Type and interface imports
import { Pet } from '../../types/globalTypes';

// import { css } from "@emotion/react"; for future use

// Custom styled Chip for no table results to display
const StyledChip = styled(Chip)(() => ({
  margin: '5rem 1rem 0',
}));

// Custom styled flex container for the table
const StyledTableContainer = styled('div')(() => ({
  display: 'flex',
  width: '100%',
}));

// Custom styled table to fill the screen width
const StyledTable = styled('div')(() => ({ flexGrow: 1 }));

export const DataTable: FC = () => {
  // Local states for loading status and boolean for if filtering
  // sold or all pets
  const [loading, setLoading] = useState(false);
  const [sold, setSold] = useState(false);

  // Snapshot of the global state
  const {
    dispatch,
    state: { user, pets },
  } = useGlobalContext();
  // Destructuring permissions value from user if exists
  // else set to null (for ts)
  const { permissions } = user || { permissions: null };

  // A callback expression to load pets from API, if no clean data try again
  // update ls and global state accordingly
  const getPets = useCallback(async () => {
    setLoading(true);

    // Try ls first to see if data exists as API is for testing
    // and doesnt actually update data (if no ls then pull from
    // API again)
    const snapshotOfPets = readPetsPersistence();
    if (Object.keys(snapshotOfPets).length === 0) {
      try {
        const res = await getAllPets();
        const pets = await res.json();
        const cleanPets = cleanPetData(pets);
        if (cleanPets.length) {
          dispatch({ type: types.SET_PETS, payload: cleanPets });
          updatePetsPersistence(cleanPets);
          setLoading(false);
        } else {
          getPets();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch({ type: types.SET_PETS, payload: snapshotOfPets });
      setLoading(false);
    }
  }, [dispatch]);

  // Side effect to load pets on component mounting
  useEffect(() => {
    getPets();
  }, [getPets]);

  // Show the loading spinner during async actions else data table
  return loading ? (
    <ClipLoader color={'blue'} loading={loading} css={''} size={100} />
  ) : (
    <StyledTableContainer>
      <StyledTable>
        {/* Only show the sold filter if admin */}
        {permissions === 'admin' && <FilterSwitch sold={sold} setSold={setSold} />}
        {/* Data Table shows all pets unless admin (will render only sold if admin selects) */}
        <DataGrid
          rows={sold ? pets.filter((pet: Pet) => pet.status === 'sold') : pets}
          // Conditionally render the correct columns by user (no id unless admin,
          // specific status col based on permission)
          columns={
            permissions === 'admin'
              ? [...Cols, ...AdminCols]
              : permissions === 'customer'
              ? [...Cols.slice(1), ...CustomerCols]
              : [...Cols.slice(1), ...PublicCols]
          }
          autoHeight={true}
          density="comfortable"
          pageSize={25}
          disableSelectionOnClick
          hideFooterSelectedRowCount
          components={{
            NoRowsOverlay: () => (
              <>
                <StyledChip label="No pets returned!" />
              </>
            ),
          }}
        />
      </StyledTable>
    </StyledTableContainer>
  );
};

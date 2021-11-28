import { FC, useCallback, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { DataGrid } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

import { Cols } from './Cols';
import { AdminCols } from './AdminCols';
import { CustomerCols } from './CustomerCols';
import { PublicCols } from './PublicCols';
import { FilterSwitch } from '../switch/FilterSwitch';

import { useGlobalContext } from '../../context/Store';
import { types } from '../../context/actions';

import { getAllPets } from '../../utils/api';
import { cleanPetData } from '../../utils/helpers';
import { readPetsPersistence, updatePetsPersistence } from '../../utils/localStorage';

import { Pet } from '../../types/globalTypes';

import { styled } from '@mui/material/styles';
// import { css } from "@emotion/react";

const StyledChip = styled(Chip)(() => ({
  margin: '5rem 1rem 0',
}));

const StyledTableContainer = styled('div')(() => ({
  display: 'flex',
  width: '100%',
}));

const StyledTable = styled('div')(() => ({ flexGrow: 1 }));

export const DataTable: FC = () => {
  const [loading, setLoading] = useState(false);
  const [sold, setSold] = useState(false);

  const {
    dispatch,
    state: { user, pets },
  } = useGlobalContext();
  const { permissions } = user || { permissions: null };

  const getPets = useCallback(async () => {
    setLoading(true);
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

  useEffect(() => {
    getPets();
  }, [getPets]);

  return loading ? (
    <ClipLoader color={'blue'} loading={loading} css={''} size={100} />
  ) : (
    <StyledTableContainer>
      <StyledTable>
        {permissions === 'admin' && <FilterSwitch sold={sold} setSold={setSold} />}
        <DataGrid
          rows={sold ? pets.filter((pet: Pet) => pet.status === 'sold') : pets}
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

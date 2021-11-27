import { FC, useCallback, useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { DataGrid } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

import { Cols } from './Cols';
import { AdminCols } from './AdminCols';
import { PublicCols } from './PublicCols';

import { useGlobalContext } from '../../context/Store';

import { getAllPets } from '../../utils/api';
import { cleanPetData } from '../../utils/helpers';

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
  const [pets, setPets] = useState([]);

  const {
    state: { user },
  } = useGlobalContext();
  const { permissions } = user || { permissions: null };

  const getPets = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllPets();
      const pets = await res.json();
      const cleanPets = cleanPetData(pets);
      setPets(cleanPets);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getPets();
  }, [getPets]);

  return loading ? (
    <ClipLoader color={'blue'} loading={loading} css={''} size={100} />
  ) : (
    <StyledTableContainer>
      <StyledTable>
        <DataGrid
          rows={pets}
          columns={
            permissions === 'admin'
              ? [...Cols, ...AdminCols]
              : permissions === 'customer'
              ? [...Cols]
              : [...Cols, ...PublicCols]
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

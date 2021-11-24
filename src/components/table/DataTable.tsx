import { FC } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { Chip } from '@mui/material';

import { Cols } from './Cols';

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
  return (
    <StyledTableContainer>
      <StyledTable>
        <DataGrid
          rows={[]}
          columns={Cols}
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

import { GridColDef } from '@mui/x-data-grid';
import { Button, Typography } from '@mui/material';

import { Pet } from '../../types/globalTypes';

export const CustomerCols: GridColDef[] = [
  {
    field: 'status',
    headerName: 'Status',
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    editable: false,
    disableColumnMenu: true,
    renderCell: ({ row }: { row: Pet }) =>
      row.status === 'available' ? (
        <Button color="success" variant="outlined">
          Purchase Pet
        </Button>
      ) : (
        <Typography>Sold</Typography>
      ),
  },
];

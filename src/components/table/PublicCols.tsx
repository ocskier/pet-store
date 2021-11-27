import { GridColDef } from '@mui/x-data-grid';
import { Typography } from '@mui/material';

import { Pet } from '../../types/globalTypes';

export const PublicCols: GridColDef[] = [
  {
    field: 'status',
    headerName: 'Status',
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    editable: false,
    disableColumnMenu: true,
    renderCell: ({ row }: { row: Pet }) => <Typography>{row.status[0].toUpperCase() + row.status.slice(1)}</Typography>,
  },
];

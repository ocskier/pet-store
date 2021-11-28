// MUI imports (Material-UI)
import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

// Component imports
import { PurchaseButton } from '../PurchaseButton';

// Type and interface imports
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
    // Custom cell for customer to purchase a pet with button or
    // Sold text if not available
    renderCell: ({ row }: { row: Pet }) =>
      row.status === 'available' ? <PurchaseButton row={row} /> : <Typography>Sold</Typography>,
  },
];

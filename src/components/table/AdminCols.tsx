// MUI imports (Material-UI)
import { GridColDef } from '@mui/x-data-grid';

// Component imports
import { SoldSwitch } from '../switch/SoldSwitch';

// Type and interface imports
import { Pet } from '../../types/globalTypes';

export const AdminCols: GridColDef[] = [
  {
    field: 'status',
    headerName: 'Status',
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    editable: false,
    disableColumnMenu: true,
    // Custom cell with styled switch for marking sold
    renderCell: ({ row }: { row: Pet }) => <SoldSwitch row={row} />,
  },
];

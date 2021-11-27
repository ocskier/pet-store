import { GridColDef } from '@mui/x-data-grid';

import { SoldSwitch } from '../switch/SoldSwitch';

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
    renderCell: ({ row }: { row: Pet }) => <SoldSwitch row={row} />,
  },
];

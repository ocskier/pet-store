import { GridColDef } from '@mui/x-data-grid';

export const Cols: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
    editable: false,
  },
  {
    field: 'photo',
    headerName: 'Photo',
    sortable: false,
  },
  {
    field: 'name',
    headerName: 'Name',
    editable: false,
  },
  {
    field: 'category',
    headerName: 'Category',
    editable: false,
  },
  {
    field: 'tags',
    headerName: 'Tags',
    editable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    editable: false,
  },
].map((col) => {
  return {
    ...col,
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    disableColumnMenu: true,
  };
});

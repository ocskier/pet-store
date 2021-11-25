import { GridColDef } from '@mui/x-data-grid';

import { Pet } from '../../types/globalTypes';

import fakePet from '../../assets/images/209-2097730_pets-nice-pets-hd-png-download.png';

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
    renderCell: ({ row }: { row: Pet }) => (
      <picture
        style={{
          display: 'flex',
          maxHeight: 'inherit',
          minHeight: 'inherit',
          height: '100%',
        }}
      >
        <source srcSet={row.category ? `https://loremflickr.com/320/240/${row.category}` : fakePet} />
        <img src={row.photo} alt={row.name} />
      </picture>
    ),
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

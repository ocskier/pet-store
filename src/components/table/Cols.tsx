// MUI imports (Material-UI)
import { Avatar } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

// Type and interface imports
import { Pet } from '../../types/globalTypes';

// Local image for when no image src is availaable
import fakePet from '../../assets/images/209-2097730_pets-nice-pets-hd-png-download.png';

// Define data columns that are shown in all views
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
      // Custom cell for styled picture with fallback image if no src url is available
      // fallback image either based on category or generic local if no category
      <Avatar variant="rounded" sx={{ width: 60, height: 60 }}>
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
      </Avatar>
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
].map((col) => {
  // Center all column data, headers, flex grow evenly, no column menu for now
  return {
    ...col,
    align: 'center',
    headerAlign: 'center',
    flex: 1,
    disableColumnMenu: true,
  };
});

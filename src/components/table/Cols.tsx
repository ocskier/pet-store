// MUI imports (Material-UI)
import { Avatar, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';

// Type and interface imports
import { Pet } from '../../types/globalTypes';

// Local image for when no image src is availaable
import fakePet from '../../assets/images/209-2097730_pets-nice-pets-hd-png-download.png';

// Custom styled Picture that fills all the cell content
const StyledPicture = styled('picture')(() => ({
  display: 'flex',
  maxHeight: 'inherit',
  minHeight: 'inherit',
  height: '100%',
}));

// Define data columns that are shown in all views
export const Cols: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 90,
    editable: false,
    hide: window.innerWidth < 476,
  },
  {
    field: 'photo',
    headerName: 'Photo',
    sortable: false,
    renderCell: ({ row }: { row: Pet }) => (
      // Custom cell for styled picture with fallback image if no src url is available
      // fallback image from generic local jpg
      <Avatar variant="rounded" sx={{ width: 65, height: 65, borderRadius: '1rem' }}>
        <StyledPicture>
          <source srcSet={fakePet} />
          {/* Temp conditional render due to anderson.info returning network error */}
          <img src={row.photo?.replace(/ /g, '%20')} alt={row.name} />
        </StyledPicture>
      </Avatar>
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    editable: false,
    renderCell: ({ row }: { row: Pet }) => {
      return <Typography>{row.name[0].toUpperCase() + row.name.slice(1)}</Typography>;
    },
  },
  {
    field: 'category',
    headerName: 'Category',
    editable: false,
    hide: window.innerWidth < 786,
  },
  {
    field: 'tags',
    headerName: 'Tags',
    editable: false,
    hide: window.innerWidth < 786,
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

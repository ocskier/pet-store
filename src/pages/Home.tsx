// MUI imports (Material-UI)
import { Box } from '@mui/material';

// Component imports
import { DataTable } from '../components/table/DataTable';

export const Home = () => {
  return (
    <>
      <div>Pets Available</div>
      <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: 'inherit' }}>
        <DataTable />
      </Box>
    </>
  );
};

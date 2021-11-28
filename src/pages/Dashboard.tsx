// MUI imports (Material-UI)
import { Box } from '@mui/material';

// Component imports
import { DataTable } from '../components/table/DataTable';

export const Dashboard = () => {
  return (
    <>
      <div>Inventory</div>
      <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: 'inherit' }}>
        <DataTable />
      </Box>
    </>
  );
};

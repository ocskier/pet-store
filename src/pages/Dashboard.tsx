import { Box } from '@mui/material';

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

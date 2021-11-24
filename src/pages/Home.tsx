import { Box } from '@mui/material';

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

// Component imports
import { StyledBox } from '../components/Box';
import { DataTable } from '../components/table/DataTable';

export const Dashboard = () => {
  return (
    <>
      <div>Inventory</div>
      <StyledBox>
        <DataTable />
      </StyledBox>
    </>
  );
};

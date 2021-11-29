// Component imports
import { StyledBox } from '../components/Box';
import { DataTable } from '../components/table/DataTable';

export const Home = () => {
  return (
    <>
      <div>Pets Available</div>
      <StyledBox>
        <DataTable />
      </StyledBox>
    </>
  );
};

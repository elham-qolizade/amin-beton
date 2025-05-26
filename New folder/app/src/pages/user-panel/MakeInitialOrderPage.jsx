import styled from "styled-components";
import AddInitialOrderForm from "../../features/user-panel/AddInitialOrderForm";

const StyledMakeInitialOrderPage = styled.div`
  min-height: 90vh;
`;

function MakeInitialOrderPage() {
  return (
    <StyledMakeInitialOrderPage>
      <AddInitialOrderForm />
    </StyledMakeInitialOrderPage>
  );
}

export default MakeInitialOrderPage;

import styled from "styled-components";
import AddCompleteOrderForm from "../../features/user-panel/AddCompleteOrderForm";

const StyledMakeCompleteOrderPage = styled.div`
  min-height: 90vh;
`;

function MakeCompleteOrderPage() {
  return (
    <StyledMakeCompleteOrderPage>
      <AddCompleteOrderForm />
    </StyledMakeCompleteOrderPage>
  );
}

export default MakeCompleteOrderPage;

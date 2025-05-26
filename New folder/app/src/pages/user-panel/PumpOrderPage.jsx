import { useParams } from "react-router-dom";
import styled from "styled-components";
import PumpOrderForm from "../../features/user-panel/PumpOrderForm";

const StyledPumpOrderPage = styled.div``;

const Title = styled.h3`
  font-size: 3rem;
  color: var(--color-brand-500);
  text-align: center;
  margin-bottom: 5rem;

  /* 500px */
  @media screen and (max-width: 31.25em) {
    font-size: 2rem;
  }
`;

function PumpOrderPage() {
  const { orderId } = useParams();

  return (
    <StyledPumpOrderPage>
      <Title> افزودن پمپ برای سفارش شماره {orderId}#</Title>
      <PumpOrderForm orderId={orderId} />
    </StyledPumpOrderPage>
  );
}

export default PumpOrderPage;

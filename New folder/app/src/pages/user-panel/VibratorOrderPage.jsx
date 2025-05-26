import { useParams } from "react-router-dom";
import styled from "styled-components";
import VibratorOrderForm from "../../features/user-panel/VibratorOrderForm";

const StyledVibratorOrderPage = styled.div``;

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

function VibratorOrderPage() {
  const { orderId } = useParams();

  return (
    <StyledVibratorOrderPage>
      <Title> افزودن ویبراتور برای سفارش شماره {orderId}#</Title>
      <VibratorOrderForm orderId={orderId} />
    </StyledVibratorOrderPage>
  );
}

export default VibratorOrderPage;

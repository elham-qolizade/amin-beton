/*eslint-disable*/
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../ui/Button";
import Heading from "../ui/Heading";

const StyledPageNotFound = styled.div`
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  background-color: var(--color-grey-800);
  img {
    width: 30rem;
  }

  h2 {
    color: var(--color-grey-200);
    font-size: 2.5rem;
  }

  button {
    background-color: var(--color-brand-500);
  }
`;

function PageNotFound() {
  const navigate = useNavigate();
  return (
    <StyledPageNotFound>
      <Heading as="h2">صفحه مورد نظر پیدا نشد.</Heading>
      <img src="/svg/not_found.svg" />
      <Button size="large" variation="primary" onClick={() => navigate(-1)}>
        بازگشت به صفحه قبلی
      </Button>
    </StyledPageNotFound>
  );
}

export default PageNotFound;

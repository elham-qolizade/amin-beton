/*eslint-disable */
import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirm = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  h3 {
    color: var(--color-green-600);
  }

  p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function Confirm({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirm>
      <Heading as="h3">تایید کردن {resourceName}</Heading>
      <p>آیا مطمعنید که می خواهید این {resourceName} را تایید کنید؟</p>

      <div>
        <Button variation="tertiary" onClick={onCloseModal} disabled={disabled}>
          لغو
        </Button>
        <Button variation="primary" onClick={onConfirm} disabled={disabled}>
          تایید
        </Button>
      </div>
    </StyledConfirm>
  );
}

export default Confirm;

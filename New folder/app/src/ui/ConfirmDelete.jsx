/*eslint-disable */
import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  h3 {
    color: var(--color-red-600);
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

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">حذف کردن {resourceName}</Heading>
      <p>
        آیا مطمعنید که می خواهید این {resourceName} را حذف کنید؟ این عملیات
        بازگشت پذیر نیست!
      </p>

      <div>
        <Button
          variation="danger"
          onClick={() => {
            onConfirm();
            onCloseModal();
          }}
          disabled={disabled}
        >
          حذف
        </Button>
        <Button variation="tertiary" onClick={onCloseModal} disabled={disabled}>
          لغو
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;

import styled from "styled-components";

const Input = styled.input`
  color: var(--color-grey-600);
  border: 1px solid var(--color-grey-600);
  background-color: transparent;
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

export default Input;

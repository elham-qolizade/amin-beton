import styled from "styled-components";

export const DropDownButton = styled.button`
  border: none;
  padding: 2rem 4rem;
  border-radius: 1rem;
  background-color: var(--color-brand-500);
  transition: all 0.3s;

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  &:hover {
    background-color: var(--color-brand-600);
  }
`;

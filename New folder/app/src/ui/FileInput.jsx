import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);
  padding: 1rem;

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin: 0.5rem 0.2rem 0.5rem 1.5rem;

    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-grey-700);
    background-color: var(--color-brand-500);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

export default FileInput;

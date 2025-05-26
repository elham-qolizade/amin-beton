/*eslint-disable */
import styled from "styled-components";

const StyledRadioInput = styled.div`
  display: flex;
  gap: 3rem;

  & .radio-input:checked + .radio-label .radio-button::after {
    opacity: 1;
  }
`;

function RadioInput({ children }) {
  return <StyledRadioInput>{children}</StyledRadioInput>;
}

export default RadioInput;

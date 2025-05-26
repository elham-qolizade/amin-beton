/* eslint-disable */
import styled from "styled-components";

const StyledTwoColFormRow = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr;
  align-items: center;
  grid-gap: 1rem;

  padding: 0.8rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function TwoColFormRow({ label, error, children, style = {}, className = "" }) {
  return (
    <StyledTwoColFormRow style={style} className={className}>
      {label && <Label htmlFor={children.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledTwoColFormRow>
  );
}

export default TwoColFormRow;

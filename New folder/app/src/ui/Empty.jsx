/*eslint-disable */
import styled from "styled-components";

const StyledEmpty = styled.p`
  color: var(--color-red-400);
  font-size: 1.6rem;
`;

function Empty() {
  return <StyledEmpty> اطلاعات مورد نظر موجود نمی باشد. </StyledEmpty>;
}

export default Empty;

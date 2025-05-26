import styled from "styled-components";
import Logo from "./Logo";

const StyledFooterLogo = styled.div`
  justify-self: start;
`;

function FooterLogo() {
  return (
    <StyledFooterLogo>
      <Logo color="green" size="3rem" />
    </StyledFooterLogo>
  );
}

export default FooterLogo;

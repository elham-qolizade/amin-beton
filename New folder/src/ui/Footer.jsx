import styled from "styled-components";
import FooterInfo from "./FooterInfo";
import FooterCopyright from "./FooterCopyright";

const StyledFooter = styled.footer`
  background-color: var(--color-footer);
  color: var(--color-grey-100);

  border-radius: 3rem 3rem 0.4rem 0.4rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Footer() {
  return (
    <StyledFooter>
      <FooterInfo />
      <FooterCopyright />
    </StyledFooter>
  );
}

export default Footer;

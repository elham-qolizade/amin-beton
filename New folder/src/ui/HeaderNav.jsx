import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import Logo from "./Logo";
import useWindowDimensions from "../hooks/useWindowDimensions";

const StyledHeaderNav = styled.div`
  width: 75%;
  margin: 0 auto;
  padding: 2rem 4rem;
  display: flex;
  align-items: center;
  gap: 4rem;

  @media screen and (max-width: 44em) {
    width: 90%;
  }
`;

const StyledHeaderLink = styled(Link)`
  font-size: 1.8rem;
  color: var(--color-grey-200);
  font-weight: 300;
  transition: all 0.2s;

  &:hover {
    color: var(--color-brand-500);
  }
`;
const StyledAnchor = styled.a`
  font-size: 1.8rem;
  color: var(--color-grey-200);
  font-weight: 300;
  transition: all 0.2s;

  &:hover {
    color: var(--color-brand-500);
  }
`;

function HeaderNav() {
  const dims = useWindowDimensions();
  const navigate = useNavigate();

  return (
    <StyledHeaderNav>
      <Logo />

      {dims.width > 700 && (
        <>
          <StyledHeaderLink to="/contact-us">ارتباط با ما</StyledHeaderLink>
          <StyledAnchor style={{ flexGrow: 1 }} href="#get-familiar">
            اشنایی با ما
          </StyledAnchor>
        </>
      )}

      <Button variation="primary" onClick={() => navigate("/signup")}>
        ثبت نام
      </Button>
      <Button variation="white" onClick={() => navigate("/login")}>
        ورود
      </Button>
    </StyledHeaderNav>
  );
}

export default HeaderNav;

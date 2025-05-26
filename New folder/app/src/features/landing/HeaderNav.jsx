import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../ui/Button";
import Logo from "../../ui/Logo";

import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useUser } from "../auth/useUser";

const StyledHeaderNav = styled.div`
  width: 75%;
  margin: 0 auto;
  padding: 2rem 4rem;
  display: flex;
  align-items: center;
  gap: 4rem;

  .logo {
    /* 700px */
    @media screen and (max-width: 43.75em) {
      flex-grow: 1;
      align-self: end;
    }
  }

  /* 700px */
  @media screen and (max-width: 44em) {
    width: 90%;
    gap: 2rem;
  }

  /* 500px */
  @media screen and (max-width: 31.25em) {
    width: 100%;
    gap: 1rem;
    padding: 2rem 2rem;
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

  const { isLoadingUser, user } = useUser();

  return (
    <StyledHeaderNav>
      <div className="logo">
        <Logo />
      </div>

      {dims.width > 700 && (
        <>
          <StyledHeaderLink to="/contact-us">ارتباط با ما</StyledHeaderLink>
          <StyledAnchor href="#get-familiar">اشنایی با ما</StyledAnchor>

          <StyledAnchor style={{ flexGrow: 1 }} href="#news">
            اخبار
          </StyledAnchor>
        </>
      )}

      {dims.width < 700 && (
        <Button
          variation="white"
          // size="small"
          onClick={() => navigate("/contact-us")}
        >
          ارتباط با ما
        </Button>
      )}

      {!isLoadingUser && user ? (
        <Button variation="primary" onClick={() => navigate("/user-panel")}>
          ورود به پنل کاربری
        </Button>
      ) : (
        <>
          <Button variation="primary" onClick={() => navigate("/signup")}>
            ثبت نام
          </Button>
          <Button variation="white" onClick={() => navigate("/login")}>
            ورود
          </Button>
        </>
      )}
    </StyledHeaderNav>
  );
}

export default HeaderNav;

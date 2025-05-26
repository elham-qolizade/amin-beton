/*eslint-disable */
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { PiPresentationChartLight } from "react-icons/pi";

import Logo from "../../ui/Logo";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-left: 1px solid var(--color-grey-200);
  grid-row: 2/2;

  display: flex;
  flex-direction: column;
  gap: 3rem;

  img {
    margin-top: 2rem;
    margin-bottom: 3rem;
  }
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function Sidebar() {
  // const navigate = useNavigate();

  return (
    <StyledSidebar>
      <Link
        to={"/"}
        style={{
          marginRight: "7rem",
        }}
      >
        <Logo size="4rem" />
      </Link>
      <nav>
        <NavList>
          <li>
            <StyledNavLink to="customers">
              <AiOutlineUser />
              <span>مشتریان</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="orders">
              <PiPresentationChartLight />
              <span>سفارشات</span>
            </StyledNavLink>
          </li>
        </NavList>
      </nav>
    </StyledSidebar>
  );
}

export default Sidebar;

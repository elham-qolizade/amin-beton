/*eslint-disable */
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";
import SpinnerMini from "../ui/SpinnerMini";
import { useLogout } from "../features/auth/useLogout";

const StyledLogoutButton = styled.button`
  background-color: var(--color-red-200);
  color: var(--color-red-700);
  font-weight: 400;
  border: none;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.4s;

  &:hover {
    background-color: var(--color-red-600);
    color: var(--color-red-100);
    font-weight: 400;
  }
`;

function LogoutButton() {
  const { isLoggingOut, logout } = useLogout();
  return (
    <StyledLogoutButton onClick={logout}>
      {isLoggingOut ? (
        <SpinnerMini />
      ) : (
        <>
          <FiLogOut />
          <span>خروج</span>
        </>
      )}
    </StyledLogoutButton>
  );
}

export default LogoutButton;

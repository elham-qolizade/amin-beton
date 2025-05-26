import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";

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
  return (
    <StyledLogoutButton>
      <FiLogOut />
      خروج
    </StyledLogoutButton>
  );
}

export default LogoutButton;

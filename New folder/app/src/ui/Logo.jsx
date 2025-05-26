/*eslint-disable */
import styled from "styled-components";

const StyledLogo = styled.img`
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

function Logo({ color = "green", size = "3rem" }) {
  return (
    <StyledLogo
      src={`/svg/logo-${color}.svg`}
      alt="Amin Beton Logo"
      style={{ height: size, width: "auto" }}
    />
  );
}

export default Logo;

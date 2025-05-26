/*eslint-disable */
import styled from "styled-components";
import { RxDoubleArrowDown } from "react-icons/rx";
import Heading from "../../ui/Heading";
import HeaderNav from "./HeaderNav";

const StyledHero = styled.div`
  width: 100%;
  height: 97vh;
  background-image: url("/images/hero-small.jpg");
  background-position: center;
  background-size: cover;
  position: relative;
  margin-bottom: 15rem;
  box-shadow: 0 4rem 3rem 3rem rgba(0, 0, 0, 0.1);

  /* 600px */
  @media screen and (max-width: 37.5em) {
    height: 70vh;
    margin-bottom: 5rem;
  }
`;

const NameAndMoto = styled.div`
  position: absolute;
  top: 30%;
  right: 20%;

  /* 500px */
  @media screen and (max-width: 31.25em) {
    top: 40%;
  }

  h1 {
    color: var(--color-brand-500);
    font-size: 10rem;
    font-weight: 900;

    @media screen and (max-width: 75em) {
      font-size: 8rem;
    }
    @media screen and (max-width: 56.25em) {
      font-size: 6rem;
    }
    @media screen and (max-width: 37.5em) {
    }
  }

  h3 {
    color: var(--color-grey-200);
    font-size: 4rem;
    font-weight: 300;
  }
`;

const IconBox = styled.div`
  position: absolute;
  bottom: 10%;
  right: 50%;

  svg {
    width: 7rem;
    height: 7rem;
    color: var(--color-grey-100);
  }
`;

function Hero() {
  return (
    <StyledHero>
      {/* Page Nav */}
      <HeaderNav />

      {/* Amin beton and Motto */}
      <NameAndMoto>
        <Heading as="h1">امین بتن</Heading>
        <Heading as="h3">شعار شرکت</Heading>
      </NameAndMoto>

      {/* <IconBox>
        <RxDoubleArrowDown />
      </IconBox> */}
    </StyledHero>
  );
}

export default Hero;

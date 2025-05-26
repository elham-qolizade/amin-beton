/*eslint-disable */
import styled from "styled-components";
import { FaTelegramPlane, FaTwitter, FaInstagram } from "react-icons/fa";
import { RxLinkedinLogo } from "react-icons/rx";

import FooterLogo from "./FooterLogo";

const StyledFooterCopyright = styled.div`
  height: 30%;
  width: 70%;
  padding-top: 3rem;
  padding-bottom: 3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;

  p {
    color: var(--color-grey-400);
    text-align: center;

    @media screen and (max-width: 44em) {
      font-size: 1.2rem;
    }
  }
`;

const FooterSocialMediaIcons = styled.div`
  justify-self: end;
  display: flex;
  gap: 1rem;

  span {
    cursor: pointer;
  }
`;

function FooterCopyright() {
  return (
    <StyledFooterCopyright>
      <FooterLogo />
      <p>کلیه حقوق مادی و معنوی محفوظ است. &copy; ۱۴۰۲ | امین بتن</p>
      <FooterSocialMediaIcons>
        <span>
          <FaInstagram />
        </span>

        <span>
          <FaTwitter />
        </span>

        <span>
          <RxLinkedinLogo />
        </span>

        <span>
          <FaTelegramPlane />
        </span>
      </FooterSocialMediaIcons>
    </StyledFooterCopyright>
  );
}

export default FooterCopyright;

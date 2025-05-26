/*eslint-disable */
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaPhone } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdOutlineMyLocation } from "react-icons/md";

import Heading from "./Heading";
import Button from "./Button";

const StyledContactUsLanding = styled.div`
  width: 75%;
  margin: 0 auto;
  margin-bottom: 15rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  svg {
    fill: var(--color-brand-500);
    width: 5rem;
    height: 5rem;
    margin-bottom: 3rem;
  }

  h2 {
    font-size: 3.5rem;
    font-weight: 800;
  }

  p {
    /* width: 30%; */
    margin-bottom: 3rem;
    margin-top: 3rem;
    font-size: 2rem;
    font-weight: 300;
  }

  img {
    @media screen and (max-width: 50em) {
      margin-top: 5rem;
    }
  }

  @media screen and (max-width: 62.5em) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 50em) {
    grid-template-columns: 1fr;
  }
  @media screen and (max-width: 37.5em) {
    width: 100%;
    padding: 3rem 5rem;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
  p {
    margin-bottom: 0rem;
    margin-top: 0rem;
    font-size: 1.6rem;
    font-weight: 600;
  }
  svg {
    width: 2rem;
    height: 2rem;
    fill: var(--color-brand-600);
    margin-bottom: 0;
  }
`;
function ContactUsLanding() {
  const navigate = useNavigate();

  return (
    <StyledContactUsLanding>
      <div>
        {/* Icon */}
        <TfiHeadphoneAlt />

        {/* Title */}
        <Heading as={"h2"}>ارتباط با ما</Heading>

        {/* Text */}
        <p>
          متخصصان ما به شما برای دستیابی به بهترین محصول متناسب با نیازتان، کمک
          می‌کنند.
        </p>

        {/* Button */}
        <Button
          variation="primary"
          size="large"
          onClick={() => navigate("/contact-us")}
        >
          ارتباط با تیم فروش
        </Button>

        {/* Info */}
        <p>همچنین می‌توانید از طرق زیر در ارتباط باشید:</p>
        <Info>
          <FaPhone />
          <p> شماره تماس : ۲۲۳۳ ۴۴۵۵ - ۰۲۱ </p>
        </Info>
        <Info>
          <IoIosMail />
          <p>پست الکترونیکی :‌ support@amin-beton.com</p>
        </Info>
        <Info>
          <MdOutlineMyLocation />
          <p>موقعیت مکانی : تهران - منطقه ۱ </p>
        </Info>
      </div>

      <img src="/svg/contact-us.svg" alt="contact us image" />
    </StyledContactUsLanding>
  );
}

export default ContactUsLanding;

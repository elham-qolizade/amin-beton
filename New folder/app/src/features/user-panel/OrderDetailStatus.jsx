/*eslint-disable */
import { FaCheck, FaFileInvoice, FaPen } from "react-icons/fa";
import { FaCartShopping, FaTruckFront } from "react-icons/fa6";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { PiSteps } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";
import styled from "styled-components";

const StyledOrderDetailStatus = styled.div`
  margin-bottom: 15rem;
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 5rem;
`;

const Statuses = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  align-items: center;
  gap: 1rem;

  .checked {
    background-color: var(--color-brand-500);
  }
`;

const StatusBox = styled.div`
  width: 16rem;
  height: 15rem;
  border: 1px solid black;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  // 600px
  @media screen and (max-width: 37.5em) {
    width: 10rem;
    height: 10rem;
  }

  &.checked {
    background-color: var(--color-brand-100);
    border: none;

    div {
      color: var(--color-green-600);
    }
  }

  div {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.4rem;
  }
`;

const statuses = [
  {
    emoji: <FaCartShopping />,
    text: "خرید اولیه",
  },

  {
    emoji: <FaPen />,
    text: "بررسی امین بتن",
  },

  {
    emoji: <FaFileInvoice />,
    text: "صدور پیش‌فاکتور",
  },

  {
    emoji: <FaCheck />,
    text: "تایید پیش‌فاکتور",
  },

  {
    emoji: <FaTruckFront />,
    text: "ارسال",
  },

  {
    emoji: <TbTargetArrow />,
    text: "دریافت",
  },
  {
    emoji: <IoCheckmarkDoneSharp />,
    text: "اتمام فرایند",
  },
];

function OrderDetailStatus({ order }) {
  return (
    <StyledOrderDetailStatus>
      <Title>
        <PiSteps />
        مراحل خرید
      </Title>

      <Statuses>
        {statuses.map((status, index) => (
          <StatusBox
            key={status.text}
            className={order?.status >= index + 1 ? "checked" : ""}
          >
            <div>{status.emoji}</div>
            <p>{status.text}</p>
          </StatusBox>
        ))}
      </Statuses>
    </StyledOrderDetailStatus>
  );
}

export default OrderDetailStatus;

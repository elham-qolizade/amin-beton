/*eslint-disable */
import styled from "styled-components";

import { MdOutlineMyLocation } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";

// Step Icons
import { FaCartShopping, FaTruckFront } from "react-icons/fa6";
import { FaPen, FaPhoneAlt, FaCheck } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

import Button from "../../ui/Button";

import {
  convertGeorgianDateToJalali,
  formatCurrency,
} from "../../utils/helpers";

import { useNavigate } from "react-router-dom";
import { useConcretePouringTypeList } from "../../hooks/useDropdownsData";
import Spinner from "../../ui/Spinner";

const StyledOrderItem = styled.div`
  /* height: 20rem; */
  background-color: var(--color-grey-200);
  margin: 5rem 0;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.2);

  display: grid;
  grid-template-columns: 1fr 1fr;

  // 900px
  @media screen and (max-width: 56.25em) {
    display: flex;
    flex-direction: column;
  }
`;

const Overview = styled.div`
  grid-column: 1/2;
  padding: 1rem;

  display: grid;
  grid-template-columns: 3fr 2fr 2fr;
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 3rem;
  align-items: center;
  text-align: center;

  // 900px
  @media screen and (max-width: 56.25em) {
    padding-right: 0;
    grid-template-columns: repeat(3, 1fr);
  }

  .image {
    grid-column: 1/2;
    grid-row: 1/-1;
  }

  .name {
    font-weight: 800;
    font-size: 2rem;
    grid-column: 2/-1;
  }

  .order-name {
    grid-column: 2/-1;
  }

  .concrete-size {
    /* font-size: 1.2rem; */
  }

  .white-box {
    background-color: var(--color-grey-0);
    padding: 0.5rem 1rem;
    border-radius: 1rem;
  }

  .black-box {
    background-color: var(--color-neutral-800);
    color: var(--color-neutral-100);
    padding: 0.5rem 1rem;
    border-radius: 1rem;
  }
`;

const Details = styled.div`
  grid-column: 2/3;

  background-color: var(--color-grey-0);
  border-radius: 1rem;
  padding: 2rem;
  margin-right: 4rem;
  box-shadow: 0.7rem 0 1rem rgba(0, 0, 0, 0.2);

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-gap: 2rem;

  // 900px
  @media screen and (max-width: 56.25em) {
    margin-right: 0;
  }

  button {
    align-self: center;
    justify-self: center;
    grid-column: 3/4;
    grid-row: 3/4;
  }
`;

const DetailItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  grid-gap: 1rem;

  .value {
    grid-column: 1/3;
    font-size: 1.4rem;
    font-weight: 300;
  }
`;

const Step = styled.div`
  grid-row: 1/-1;

  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  justify-content: space-evenly;
  align-items: center;
  gap: 1rem;

  border-left: 1px dashed var(--color-grey-600);

  .title {
  }

  .emoji {
    font-size: 2.5rem;
    color: var(--color-brand-500);
  }

  .text {
    font-weight: 800;
  }
`;

const stepToUi = {
  1: {
    emoji: <FaCartShopping />,
    text: "خرید اولیه",
  },

  2: {
    emoji: <FaPen />,
    text: "بررسی امین بتن",
  },

  3: {
    emoji: <FaPhoneAlt />,
    text: "تماس با شما",
  },

  4: {
    emoji: <FaCheck />,
    text: "نهایی سازی خرید",
  },

  5: {
    emoji: <FaTruckFront />,
    text: "ارسال",
  },

  6: {
    emoji: <TbTargetArrow />,
    text: "دریافت",
  },

  7: {
    emoji: <IoCheckmarkDoneSharp />,
    text: "اتمام فرایند",
  },
};

function OrderItem({ order }) {
  const { isLoadingConcretePouringTypeList, concretePouringTypeList } =
    useConcretePouringTypeList();

  const navigate = useNavigate();

  const orderDeliveryDate = order.delivery_datetime.split(" ")[0];
  const orderDeliveryTime = `${
    order.delivery_datetime.split(" ")[1].split(":")[0]
  }:${order.delivery_datetime.split(" ")[1].split(":")[1]}`;

  if (isLoadingConcretePouringTypeList) return <Spinner />;

  return (
    <StyledOrderItem>
      <Overview>
        <img src="/images/brick-2.jpg" alt="brick image" className="image" />
        <div className="name">سفارش {order.order_id}#</div>

        <div className="white-box order-name">{order.order_name}</div>

        <div className="black-box concrete-size">
          {
            concretePouringTypeList.find(
              (item) => item.id === order.concrete_pouring_type
            ).title
          }
        </div>

        <div className="black-box">
          {order.verified ? "تایید شده" : "تایید نشده"}
        </div>
      </Overview>

      <Details>
        <Step>
          <span className="title">مرحله کنونی</span>
          <span className="emoji">{stepToUi[order.status].emoji}</span>
          <span className="text">{stepToUi[order.status].text}</span>
        </Step>

        <DetailItem>
          <SlCalender />
          <span>تاریخ ارسال</span>
          <span className="value">
            {convertGeorgianDateToJalali(orderDeliveryDate)}
            <br />
            ساعت {orderDeliveryTime}
          </span>
        </DetailItem>

        <DetailItem>
          <CiCalendar />
          <span>تاریخ سفارش</span>
          <span className="value">{order.order_date}</span>
        </DetailItem>

        <DetailItem>
          <MdOutlineMyLocation />
          <span>مکان ارسال</span>
          <span className="value">{order.deliver_location}</span>
        </DetailItem>

        <DetailItem>
          <MdOutlineMyLocation />
          <span>هزینه سفارش</span>
          <span className="value">
            {order.status == 7 ? formatCurrency(order.price) : "نامشخص"}
          </span>
        </DetailItem>
        <Button size="small" onClick={() => navigate(`${order.id}`)}>
          مشاهده جزئیات{" "}
        </Button>
      </Details>
    </StyledOrderItem>
  );
}

export default OrderItem;

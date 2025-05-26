/*eslint-disable */
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { MdOutlineMyLocation } from "react-icons/md";
import { TbTriangleSquareCircleFilled } from "react-icons/tb";
import { CiCalendar } from "react-icons/ci";
import { FaMoneyCheckAlt } from "react-icons/fa";

import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { formatCurrency } from "../../utils/helpers";

const StyledOrderPageHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, auto);
  grid-gap: 2rem;
  align-items: center;
  justify-items: center;

  .item {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .project-name {
    font-size: 2.5rem;
    font-weight: 900;
  }

  .project-description {
    grid-column: 2/-2;
    width: 100%;
  }

  .order-button {
    grid-column: -2/-1;
    grid-row: 1/2;
    justify-self: stretch;
  }

  .history-button {
    grid-column: -2/-1;
    grid-row: 2/3;
    justify-self: stretch;
  }
`;

function OrderPageHeader({ orders, project }) {
  const navigate = useNavigate();

  const totalPrice = orders.reduce((acc, order) => acc + order.order_price, 0);

  return (
    <StyledOrderPageHeader>
      <div className="item project-name"> {project.name} </div>

      <Input
        className=" item project-description"
        value={project.description}
      />

      <div className="item start-date">
        <CiCalendar />
        {project.start_date}
      </div>

      <div className="item total-price">
        <FaMoneyCheckAlt />
        {formatCurrency(totalPrice)}
      </div>

      <div className="item orders-num">
        <TbTriangleSquareCircleFilled />
        تعداد سفارشات : {orders.length}
      </div>

      <div className="item project-location">
        <MdOutlineMyLocation />
        {project.location}
      </div>

      <Button size="small" className="order-button">
        خرید برای این پروژه
      </Button>

      <Button
        size="small"
        variation="tertiary"
        className="history-button"
        onClick={() => navigate("history")}
      >
        سابقه خرید این پروژه
      </Button>
    </StyledOrderPageHeader>
  );
}

export default OrderPageHeader;

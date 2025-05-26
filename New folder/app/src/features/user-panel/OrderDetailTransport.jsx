/*eslint-disable */
import styled from "styled-components";
import { FaTruck } from "react-icons/fa";
import OrderDetailTruck from "./OrderDetailTruck";

const StyledOrderDetailTransport = styled.div`
  margin-bottom: 15rem;
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 5rem;
`;

const Trucks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-around;
  align-items: center;
  grid-gap: 5rem;

  // 1200px
  @media screen and (max-width: 75em) {
    grid-template-columns: 1fr;
  }

  .checked {
    background-color: var(--color-brand-500);
  }
`;

const truck1 = {
  title: "ماشین اول",
  driver: "حسن حسنی",
  plate: "۱۲ل۱۲۳ ۹۹",
  wayBill: "۱۲ل۱۲۳ ۹۹",
  volume: "۱۲۳ کیلوگرم",
  type: "۱۲ل۱۲۳ ۹۹",
  deliveryDate: "۲۳ خرداد",
  arrived: true,
};

const truck2 = {
  title: "ماشین دوم",
  driver: "مجتبی میرزایی",
  plate: "۱۲ل۱۲۳ ۹۹",
  wayBill: "۱۲ل۱۲۳ ۹۹",
  volume: "۴۵۶ کیلوگرم",
  type: "۱۲ل۱۲۳ ۹۹",
  deliveryDate: "۱۲ تیر",
  arrived: false,
};

function OrderDetailTransport({ order }) {
  return (
    <StyledOrderDetailTransport>
      <Title>
        <FaTruck />
        حمل و نقل
      </Title>

      <Trucks>
        <OrderDetailTruck
          truck={truck1}
          latitude={order?.project?.latitude}
          longitude={order?.project?.longitude}
        />
        <OrderDetailTruck
          truck={truck2}
          latitude={order?.project?.latitude}
          longitude={order?.project?.longitude}
        />
      </Trucks>
    </StyledOrderDetailTransport>
  );
}

export default OrderDetailTransport;

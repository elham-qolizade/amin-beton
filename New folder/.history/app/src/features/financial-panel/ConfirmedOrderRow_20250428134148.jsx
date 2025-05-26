/* eslint-disable */
import styled from "styled-components";

import { BsCardChecklist } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";

// import FactorAndPriceWindow from "./FactorAndPriceWindow";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import FactorAndPriceWindow from "./factor";

import { useAddFactorAndPrice } from "./useAddFactor";

const WatchIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--color-brand-600);
  transition: all 0.3s;

  &:hover {
    color: var(--color-brand-800);
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const PreFactorPreviewIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--color-indigo-600);
  transition: all 0.3s;

  &:hover {
    color: var(--color-indigo-800);
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

function ConfirmedOrderRow({ order }) {
  const { isSending, sendFactor } = useAddFactorAndPrice();

  if (!order) {
    return <Table.Row>داده‌ای برای این سفارش یافت نشد.</Table.Row>;
  }

  return (
    <Table.Row>
      <Modal>
        {/* ✅ آیکون پیش‌فاکتور برای باز کردن مودال */}
        <Modal.Open opens="preFactor">
          <PreFactorPreviewIcon>
            <BsCardChecklist />
          </PreFactorPreviewIcon>
        </Modal.Open>

        {/* ✅ مودال پیش‌فاکتور */}
        <Modal.Window name="preFactor">
          <Factor
            orderDetails={order} // ✅ ارسال اطلاعات سفارش
            onConfirm={sendFactor}
            disabled={isSending}
          />
        </Modal.Window>

        {/* ✅ نمایش قیمت */}
        <Modal.Open opens="cost">
          <WatchIcon>
            <GrMoney />
          </WatchIcon>
        </Modal.Open>

        <Modal.Window name="cost">
          <FactorAndPriceWindow
            orderDetails={order}
            onConfirm={sendFactor}
            disabled={isSending}
          />
        </Modal.Window>

        <div>{order.order_name}</div>
        <div>{order.order_id}</div>
        <div>{order.project.title}</div>

        <div>{order.project.user_fullname}</div>
        <div>{order.project.user_phone}</div>
        <div>{order.project.user_username}</div>
        <div>{order.project.user_id}</div>
      </Modal>
    </Table.Row>
  );
}

export default ConfirmedOrderRow;

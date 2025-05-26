/*eslint-disable */
import styled from "styled-components";
import { FaEye } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";
import { FaRegStickyNote } from "react-icons/fa";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ObserveOrder from "./ObserveOrder";
import AddNote from "./AddNote";
import FactorAndPriceWindow from "./Prefactor"; // مطمئن شوید که مسیر درست است
import { useDeleteOrder } from "../../hooks/useOrders";
import { useAddNote } from "../../hooks/useNotes";
import { useAddFactorAndPrice } from "./useAddFactor"; // ایمپورت sendFactor و isSending

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

const DeleteIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--color-red-600);
  transition: all 0.3s;

  &:hover {
    color: var(--color-red-800);
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const FactorPreviewIcon = styled.div`
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

const NoteIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--color-grey-600);
  transition: all 0.3s;

  &:hover {
    color: var(--color-grey-800);
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

function ConfirmedOrderRow({ order }) {
  const { isDeleting, deleteOrder } = useDeleteOrder();
  const { isSending, addNote } = useAddNote();
  const { isSending: isFactorSending, sendFactor } = useAddFactorAndPrice(); // ارسال فاکتور

  // اگر داده‌ای برای سفارش وجود ندارد
  if (!order || !order.project) {
    return <Table.Row>داده‌ای برای این سفارش یافت نشد.</Table.Row>;
  }

  return (
    <Table.Row>
      <Modal>
        {/* مشاهده سفارش */}
        <Modal.Open opens="observe">
          <WatchIcon>
            <FaEye />
          </WatchIcon>
        </Modal.Open>
        <Modal.Window name="observe">
          <div style={{ padding: "2rem" }}>تست نمایش observe</div>
        </Modal.Window>

        {/* حذف سفارش */}
        <Modal.Open opens="delete">
          <DeleteIcon>
            <FaTrash />
          </DeleteIcon>
        </Modal.Open>

        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="سفارش"
            onConfirm={() => deleteOrder(order.id)}
            disabled={isDeleting}
          />
        </Modal.Window>

        {/* پیش‌فاکتور */}
        <Modal.Open opens="preFactor">
          <FactorPreviewIcon>
            <BsCardChecklist />
          </FactorPreviewIcon>
        </Modal.Open>

        <Modal.Window name="preFactor">
          <FactorAndPriceWindow
            orderDetails={order} // ارسال اطلاعات سفارش
            onConfirm={sendFactor}
            disabled={isFactorSending}
          />
        </Modal.Window>

        {/* اضافه کردن یادداشت */}
        <Modal.Open opens="note">
          <NoteIcon>
            <FaRegStickyNote />
          </NoteIcon>
        </Modal.Open>

        <Modal.Window name="note">
          <AddNote
            onConfirm={addNote}
            disabled={isSending}
            orderId={order.id}
          />
        </Modal.Window>

        {/* نمایش جزئیات سفارش */}
        <div>{order.order_name}</div>
        <div>{order.order_id}</div>

        <div>{order.project.title}</div>
        <div>{order.project.user_fullname}</div>
        <div>{order.project.user_username}</div>
        <div>{order.project.user_id}</div>
      </Modal>
    </Table.Row>
  );
}

export default ConfirmedOrderRow;

/*eslint-disable */
import styled from "styled-components";
import { useSms } from "../../hooks/useSms";
import { FaEye, FaRegStickyNote } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";
import FactorAndPriceWindow from "./factor"; // مطمئن شوید که مسیر درست است
import { useAddFactorAndPrice } from "./useAddFactor"; // ایمپورت sendFactor و isSending
import { FaTruck } from "react-icons/fa";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import ObserveOrder from "./ObserveOrder";
import { useAddNote } from "../../hooks/useNotes";
import AddNote from "./AddNote";
import { useNote } from "../../hooks/useNotes";
import { useEffect } from "react";
import Spinner from "../../ui/Spinner";
import { FaCommentSms } from "react-icons/fa6";
import BillsOfLadingWindow from "./BillsOfLadingWindow";

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
const CheckmarkIcon = styled.div`
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

const NoteWindow = styled.div`
  height: 40vh;
  width: 40vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;

  h3 {
    margin-bottom: 3rem;
    color: var(--color-brand-500);
  }

  .no-note {
    color: var(--color-red-600);
  }

  .with-note {
  }
`;

const SmsIcon = styled.div`
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

function ConfirmedOrderRow({ order }) {
  const { isLoadingNote, getNote, note } = useNote();
  const { isSending, addNote } = useAddNote();

  // console.log(`note ${order.id} :`, note);
  const { isSending: isFactorSending, sendFactor } = useAddFactorAndPrice(); // ارسال فاکتور
  const { sendSms, isSending: isSmsSending, success, error } = useSms();
  // useEffect(() => {
  //   getNote(order.id);
  // }, [getNote, order.id]);

  if (isLoadingNote) return <Spinner />;
  const handleSendSms = () => {
    const text = `سلام ${order.project.user_fullname} عزیز، 
    سفارش شما با شماره ${order.order_id} در حال بررسی است.`;

    sendSms(order.id, order.project.user_phone, text);
  };
  {
    /* #################################### */
  }
  // تابع تغییر وضعیت سفارش
  const handleDeliverOrder = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token?.access) {
      alert("❌ توکن یافت نشد، لطفاً وارد شوید");
      return;
    }

    try {
      const response = await fetch(
        `https://amin-beton-back.chbk.app/api/order-management/${order.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access}`,
          },
          body: JSON.stringify({ status: 7 }),
        }
      );

      if (!response.ok) throw new Error("خطا در تغییر وضعیت سفارش");
      alert("✅ سفارش با موفقیت تحویل داده  شد");
    } catch (error) {
      console.error("deliver error:", error);
      alert("❌ مشکلی در تحویل سفارش به وجود آمد");
    }
  };
  const getOrderStatus = async (orderId) => {
    console.log("در حال ارسال درخواست برای سفارش با شناسه:", orderId);

    try {
      const response = await axios.get(
        `https://amin-beton-back.chbk.app/api/orders/${orderId}/status/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.status; // فرض کنید وضعیت به صورت عددی در `status` ذخیره میشه
    } catch (error) {
      console.error("❌ خطا در دریافت وضعیت سفارش:", error);
      return null;
    }
  };

  return (
    <Table.Row>
      <Modal>
        {/* #################################### */}

        <Modal.Open opens="observe">
          <WatchIcon>
            <FaEye />
          </WatchIcon>
        </Modal.Open>

        <Modal.Window name="observe">
          <ObserveOrder order={order} />
        </Modal.Window>

        {/* #################################### */}

        <Modal.Open opens="preFactor">
          <FactorPreviewIcon>
            <BsCardChecklist />
          </FactorPreviewIcon>
        </Modal.Open>

        <Modal.Window name="preFactor">
          <FactorAndPriceWindow
            orderDetails={order}
            onConfirm={sendFactor}
            disabled={isFactorSending}
          />
        </Modal.Window>

        {/* #################################### */}
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

        {/* #################################### */}
        <Modal.Open opens="transport">
          <SmsIcon>
            <FaTruck />
          </SmsIcon>
        </Modal.Open>

        <Modal.Window name="transport">
          <BillsOfLadingWindow orderId={order.id} />
        </Modal.Window>
        <CheckmarkIcon onClick={handleDeliverOrder}>
          <IoMdCheckmarkCircleOutline />
        </CheckmarkIcon>

        {/* #################################### */}

        <div>{order.order_name}</div>
        <div>{order.order_id}</div>
        <div>{order.project.title}</div>
        {/* <div>ff</div> */}
        <div>{order.project.user_fullname}</div>
        <div>{order.project.user_phone}</div>
        <div>{order.project.user_username}</div>
        <div>{order.project.user_id}</div>
      </Modal>
    </Table.Row>
  );
}

export default ConfirmedOrderRow;

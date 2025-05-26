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

import { useNote } from "../../hooks/useNotes";
import { useEffect } from "react";
import Spinner from "../../ui/Spinner";
import { FaCommentSms } from "react-icons/fa6";

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
  // console.log(`note ${order.id} :`, note);
  const { isSending: isFactorSending, sendFactor } = useAddFactorAndPrice(); // ارسال فاکتور
  const { sendSms, isSending: isSmsSending, success, error } = useSms();
  useEffect(() => {
    getNote(order.id);
  }, [getNote, order.id]);

  if (isLoadingNote) return <Spinner />;
  const handleSendSms = () => {
    const text = `سلام ${order.project.user_fullname} عزیز، 
    سفارش شما با شماره ${order.order_id} در حال بررسی است.`;

    sendSms(order.id, order.project.user_phone, text);
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
          <NoteWindow>
            <h3>یادداشت برای سفارش شماره {order.id}</h3>

            {note?.length === 0 ? (
              <p className="no-note">یادداشتی برای نمایش وجود ندارد</p>
            ) : (
              <p className="with-note"> متن یادداشت : {note?.[0]?.text}</p>
            )}
          </NoteWindow>
        </Modal.Window>

        {/* #################################### */}
        <Modal.Open opens="transport">
          <SmsIcon>
            <FaTruck />
          </SmsIcon>
        </Modal.Open>
        <Modal.Open>
          <CheckmarkIcon>
            <IoMdCheckmarkCircleOutline />
          </CheckmarkIcon>
        </Modal.Open>
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

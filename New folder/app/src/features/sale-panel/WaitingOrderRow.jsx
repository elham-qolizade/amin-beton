/*eslint-disable */
import styled from "styled-components";
import { FaEye, FaFlagCheckered } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import Confirm from "../../ui/Confirm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import ObserveOrder from "./ObserveOrder";
import UpdateWaitingOrder from "./UpdateWaitingOrder";
import {
  useApproveOrder,
  useDeleteOrder,
  useUpdateOrder,
} from "../../hooks/useOrders";

const ConfirmIcon = styled.div`
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

const WatchIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--color-grey-500);
  transition: all 0.3s;
  &:hover {
    color: var(--color-grey-800);
  }
  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const EditIcon = styled.div`
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

function WaitingOrderRow({ order }) {
  console.log("WaitingOrderRow order:", order);
  const { isApproving, approveOrder } = useApproveOrder();
  const { isDeleting, deleteOrder } = useDeleteOrder();
  const { updateOrder, isUpdating } = useUpdateOrder();

  return (
    <Table.Row>
      <Modal>
        <Modal.Open opens="approve">
          <ConfirmIcon>
            <FaFlagCheckered />
          </ConfirmIcon>
        </Modal.Open>
        <Modal.Window name="approve">
          <Confirm
            resourceName="سفارش"
            onConfirm={() => approveOrder(order.id)}
            disabled={isApproving}
          />
        </Modal.Window>

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

        <Modal.Open opens="observe">
          <WatchIcon>
            <FaEye />
          </WatchIcon>
        </Modal.Open>
        <Modal.Window name="observe">
          <ObserveOrder order={order} />
        </Modal.Window>

        <Modal.Open opens="edit">
          <EditIcon>
            <MdEdit />
          </EditIcon>
        </Modal.Open>
        <Modal.Window name="edit">
          <UpdateWaitingOrder
            order={order}
            onConfirm={updateOrder}
            disabled={isUpdating}
          />
        </Modal.Window>
      </Modal>

      <div>{order.order_name}</div>
      <div>{order.order_id}</div>
      <div>{order.project?.title || "بدون پروژه"}</div>
      <div>{order.project?.user_fullname || "نامشخص"}</div>
      <div>{order.project?.user_username || "نامشخص"}</div>
    </Table.Row>
  );
}

export default WaitingOrderRow;

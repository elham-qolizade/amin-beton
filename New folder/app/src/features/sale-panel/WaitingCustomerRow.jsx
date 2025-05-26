/*eslint-disable */
import styled from "styled-components";
import { FaFlagCheckered } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Confirm from "../../ui/Confirm";
import UpdateWaitingCustomer from "./UpdateWaitingCustomer";

import {
  useApproveCustomer,
  useUpdateCustomer,
  useDeleteCustomer,
} from "./useCustomers";

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

function WaitingCustomerRow({ customer }) {
  const { approveCustomer, isApproving } = useApproveCustomer();
  const { updateCustomer, isUpdating } = useUpdateCustomer();
  const { deleteCustomer, isDeleting } = useDeleteCustomer();

  console.log("customer from Row : ", customer);
  return (
    <Table.Row>
      <Modal>
        <Modal.Open opens="confirm">
          <ConfirmIcon>
            <FaFlagCheckered />
          </ConfirmIcon>
        </Modal.Open>
        <Modal.Window name="confirm">
          <Confirm
            resourceName="مشتری منتظر احراز هویت"
            onConfirm={() => approveCustomer(customer.id)}
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
            resourceName="مشتری منتظر احراز هویت"
            onConfirm={() => deleteCustomer(customer.id)}
            disabled={isDeleting}
          />
        </Modal.Window>

        <Modal.Open opens="edit">
          <EditIcon>
            <MdEdit />
          </EditIcon>
        </Modal.Open>
        <Modal.Window name="edit">
          <UpdateWaitingCustomer
            customer={customer}
            onConfirm={updateCustomer}
            disabled={isUpdating}
          />
        </Modal.Window>
      </Modal>

      <div>{customer.username}</div>
      <div>{customer.first_name}</div>
      <div>{customer.last_name}</div>
    </Table.Row>
  );
}

export default WaitingCustomerRow;

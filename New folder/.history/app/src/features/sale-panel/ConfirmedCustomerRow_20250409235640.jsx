/*eslint-disable */
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import UpdateConfirmedCustomer from "./UpdateConfirmedCustomer";

import { useDeleteCustomer, useUpdateCustomer } from "./useCustomers";

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

function ConfirmedCustomersRow({ customer }) {
  const { updateCustomer, isUpdating } = useUpdateCustomer();
  const { deleteCustomer, isDeleting } = useDeleteCustomer();
  return (
    <Table.Row>
      <Modal>
        <Modal.Open opens="delete">
          <DeleteIcon>
            <FaTrash />
          </DeleteIcon>
        </Modal.Open>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName={"مشتری احراز شده"}
            onConfirm={() => deleteCustomer(customer.id)}
            disabled={isDeleting}
          />
        </Modal.Window>

        <Modal.Open opens={"edit"}>
          <EditIcon>
            <MdEdit />
          </EditIcon>
        </Modal.Open>
        <Modal.Window name={"edit"}>
          <UpdateConfirmedCustomer
            customer={customer}
            onConfirm={updateCustomer}
            disabled={isUpdating}
          />
        </Modal.Window>
      </Modal>

      {/* <div>{customer.phone}</div> */}
      <div>{customer.username}</div>
      <div>{customer.first_name}</div>
      <div>{customer.last_name}</div>
      <div>{customer.id}</div>
    </Table.Row>
  );
}

export default ConfirmedCustomersRow;

/*eslint-disable */
import styled from "styled-components";
import Table from "../../ui/Table";
import { FaEye } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";

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

function ConfirmedOrderRow({ order }) {
  return (
    <Table.Row>
      <WatchIcon>
        <FaEye />
      </WatchIcon>

      <DeleteIcon>
        <FaTrash />
      </DeleteIcon>

      <FactorPreviewIcon>
        <BsCardChecklist />
      </FactorPreviewIcon>

      <div>{order.product_name}</div>
      <div>{order.product_number}</div>
      <div>{order.project_name}</div>

      <div>{order.first_name}</div>
      <div>{order.last_name}</div>
      <div>{order.customer_id}</div>
    </Table.Row>
  );
}

export default ConfirmedOrderRow;

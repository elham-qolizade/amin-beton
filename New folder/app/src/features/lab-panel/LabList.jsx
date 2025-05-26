/*eslint-disable */
import styled from "styled-components";

import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import LabListItem from "./LabListItem";

import { useConfirmedOrders } from "../../hooks/useOrders";

const StyledLabList = styled.div`
  padding: 4rem;
  border-bottom: 1px solid var(--color-grey-300);
`;

function LabList() {
  const { isLoading, confirmedOrders } = useConfirmedOrders();

  if (isLoading) return <Spinner />;

  return (
    <StyledLabList>
      <Table columns="25rem 1fr 1fr 1fr 1fr ">
        <Table.Header>
          <div></div>

          <div> شماره مشتری</div>
          <div>نام پروژه</div>
          <div>نام محصول</div>
          <div> شماره سفارش</div>
        </Table.Header>

        <Table.Body
          data={confirmedOrders}
          render={(order) => <LabListItem key={order.id} listItem={order} />}
        />
      </Table>
    </StyledLabList>
  );
}

export default LabList;

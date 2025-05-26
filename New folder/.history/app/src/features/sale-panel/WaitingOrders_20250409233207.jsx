/*eslint-disable */
import { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { DropDownButton } from "../../ui/DropDownButton";
import WaitingOrderRow from "./WaitingOrderRow";

import { useWaitingOrders } from "../../hooks/useOrders";

const StyledWaitingOrders = styled.div`
  padding: 4rem;
  border-bottom: 1px solid var(--color-grey-300);
`;

function WaitingOrders() {
  const { waitingOrders, isLoading } = useWaitingOrders();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) return <Spinner />;
  return (
    <StyledWaitingOrders>
      <DropDownButton onClick={() => setIsOpen((prev) => !prev)}>
        سفارشات منتظر تایید
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </DropDownButton>

      {isOpen && (
        <Table columns="6rem 6rem 6rem  1fr 1fr 1fr 1fr 1fr 1fr">
          <Table.Header>
            <div>تایید</div>
            <div>ابطال</div>
            <div>مشاهده</div>
            <div>ویرایش</div>
            <div>سفارش</div>
            <div>شماره سفارش </div>
            <div>نام پروژه</div>
            <div>نام</div>
            <div>نام کاربری</div>
          </Table.Header>

          <Table.Body
            data={waitingOrders}
            render={(order) => <WaitingOrderRow key={order.id} order={order} />}
          />
        </Table>
      )}
    </StyledWaitingOrders>
  );
}

export default WaitingOrders;

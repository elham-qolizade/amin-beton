/*eslint-disable */
import { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { DropDownButton } from "../../ui/DropDownButton";
import WaitingOrderRow from "./WaitingOrderRow";

import { useWaitingOrders } from "./useOrders";

const StyledWaitingOrders = styled.div`
  padding: 4rem;
  border-bottom: 1px solid var(--color-grey-300);
`;

function WaitingOrders() {
  const [isOpen, setIsOpen] = useState(false);
  const { waitingOrders, isLoading } = useWaitingOrders();

  if (isLoading) return <Spinner />;

  return (
    <StyledWaitingOrders>
      <DropDownButton onClick={() => setIsOpen((s) => !s)}>
        سفارشات منتطر تایید
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </DropDownButton>

      {isOpen && (
        <Table columns="10rem 10rem 10rem 1fr 1fr 1fr 1fr 1fr 1fr">
          <Table.Header>
            <div>تایید</div>
            <div>ابطال</div>
            <div>ویرایش</div>

            <div> نام محصول</div>
            <div>شماره محصول</div>
            <div>نام پروژه</div>

            <div>نام</div>
            <div>نام خانوادگی</div>
            <div>شماره مشتری</div>
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

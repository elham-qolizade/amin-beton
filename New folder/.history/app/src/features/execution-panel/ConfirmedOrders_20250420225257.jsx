import { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import { DropDownButton } from "../../ui/DropDownButton";
import ConfirmedOrderRow from "./ConfirmedOrderRow";

import { useConfirmedOrders } from "../../hooks/useOrders";

const StyledConfirmedOrders = styled.div`
  padding: 4rem;
  border-bottom: 1px solid var(--color-grey-300);
`;

function ConfirmedOrders() {
  const [isOpen, setIsOpen] = useState(false);
  const { confirmedOrders, isLoading } = useConfirmedOrders();

  if (isLoading) return <Spinner />;

  return (
    <StyledConfirmedOrders>
      <DropDownButton onClick={() => setIsOpen((s) => !s)}>
        سفارشات تایید شده
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </DropDownButton>

      {isOpen && (
        <Table columns="7rem 10rem 7rem 1.5fr 1fr 1fr 1fr 1fr 1fr 1fr ">
          <Table.Header>
            <div>مشاهده</div>
            <div>پیش فاکتور</div>
            <div>یادداشت</div>
            <div>حمل و نقل</div>
            <div>تحویل خرید</div>
            <div>نام محصول</div>
            <div>شماره محصول</div>
            <div>نام پروژه</div>

            <div>نام</div>
            <div>شماره تلفن</div>
            <div>نام کاربری</div>
            {/* <div>شماره مشتری</div> */}
          </Table.Header>

          <Table.Body
            data={confirmedOrders}
            render={(order) => (
              <ConfirmedOrderRow key={order.id} order={order} />
            )}
          />
        </Table>
      )}
    </StyledConfirmedOrders>
  );
}

export default ConfirmedOrders;

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
        <Table columns="7rem 15rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ">
          <Table.Header>
            <div>پیش فاکتور</div>
            <div>فاکتور و هزینه نهایی</div>
            <div>موقعیت پروژه</div>
            <div>گردش مالی</div>
            <div>نام محصول</div>
            <div>شماره محصول</div>
            <div>نام پروژه</div>
            <div>نام</div>
            <div>شماره تلفن</div>
            <div>نام کاربری</div>
            <div>شماره مشتری</div>
            {/* ستون جدید */}
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

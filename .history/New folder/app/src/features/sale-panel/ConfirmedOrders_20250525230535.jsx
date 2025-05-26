import { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();

  // این تابع داده به‌روز شده را مستقیم توی کش react-query آپدیت می‌کند

  const handleOrderUpdate = (updatedOrder) => {
    queryClient.setQueryData(["confirmed-orders"], (oldData) => {
      if (!oldData) return oldData;
      return oldData.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      );
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <StyledConfirmedOrders>
      <DropDownButton onClick={() => setIsOpen((s) => !s)}>
        سفارشات تایید شده
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </DropDownButton>

      {isOpen && (
        <Table columns="6rem 6rem 9rem 6rem 1fr 1fr 1fr 1fr 1fr 1fr">
          <Table.Header>
            <div>مشاهده</div>
            <div>ابطال</div>
            <div>پیش فاکتور ها</div>
            <div>یادداشت</div>

            <div>نام محصول</div>
            <div>شماره محصول</div>
            <div>نام پروژه</div>

            <div>نام</div>
            <div>نام کاربری</div>
            <div>شماره مشتری</div>
          </Table.Header>

          <Table.Body
            data={confirmedOrders}
            render={(order) => (
              <ConfirmedOrderRow
                key={order.id}
                order={order}
                onUpdateOrder={handleOrderUpdate} // اینجا پاس میدیم
              />
            )}
          />
        </Table>
      )}
    </StyledConfirmedOrders>
  );
}

export default ConfirmedOrders;

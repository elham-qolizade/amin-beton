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
  const [searchTerm, setSearchTerm] = useState(""); // 👈 اضافه شد
  const { confirmedOrders, isLoading } = useConfirmedOrders();

  if (isLoading) return <Spinner />;

  // فیلتر داده‌ها بر اساس جستجو (غیراحساس به حروف کوچک/بزرگ)
  const filteredOrders = confirmedOrders?.filter((order) =>
    JSON.stringify(order).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StyledConfirmedOrders>
      <DropDownButton onClick={() => setIsOpen((s) => !s)}>
        سفارشات تایید شده
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </DropDownButton>

      {isOpen && (
        <>
          {/* 🌟 فیلد جستجو */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="جستجو..."
              className="border px-3 py-2 rounded w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table columns="7rem 10rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr ">
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
            </Table.Header>

            <Table.Body
              data={filteredOrders}
              render={(order) => (
                <ConfirmedOrderRow key={order.id} order={order} />
              )}
            />
          </Table>
        </>
      )}
    </StyledConfirmedOrders>
  );
}

export default ConfirmedOrders;

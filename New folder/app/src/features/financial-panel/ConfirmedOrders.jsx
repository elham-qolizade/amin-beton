import { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import { DropDownButton } from "../../ui/DropDownButton";
import ConfirmedOrderRow from "./ConfirmedOrderRow";
import { useConfirmedOrders } from "../../hooks/useOrders";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const StyledConfirmedOrders = styled.div`
  padding: 4rem;
  border-bottom: 1px solid var(--color-grey-300);
`;

function ConfirmedOrders() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // وضعیت تاریخ به صورت شی DateObject
  const [startDateObj, setStartDateObj] = useState(null);
  const [endDateObj, setEndDateObj] = useState(null);

  // تاریخ به فرمت YYYY-MM-DD برای ارسال به API
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // تبدیل تاریخ شمسی به میلادی هر بار که شی تاریخ تغییر کنه
  useEffect(() => {
    if (startDateObj) {
      const gDate = startDateObj.toDate().toISOString().slice(0, 10);
      setStartDate(gDate);
    } else {
      setStartDate("");
    }
  }, [startDateObj]);

  useEffect(() => {
    if (endDateObj) {
      const gDate = endDateObj.toDate().toISOString().slice(0, 10);
      setEndDate(gDate);
    } else {
      setEndDate("");
    }
  }, [endDateObj]);

  // ساخت query string برای فیلتر
  const queryParams = [];
  if (startDate) queryParams.push(`delivery_datetime__gte=${startDate} 00:00`);
  if (endDate) queryParams.push(`delivery_datetime__lte=${endDate} 23:59`);
  const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

  const { confirmedOrders, isLoading } = useConfirmedOrders(queryString);
  if (isLoading) return <Spinner />;

  const filteredOrders = confirmedOrders?.filter((order) =>
    JSON.stringify(order).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StyledConfirmedOrders>
      <DropDownButton onClick={() => setIsOpen((s) => !s)}>
        سفارشات تایید شده {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </DropDownButton>

      {isOpen && (
        <>
          {/* فیلتر تاریخ */}
          <div className="flex gap-4 mb-4">
            <div className="flex flex-col">
              <label>از تاریخ:</label>
              <DatePicker
                value={startDateObj}
                onChange={setStartDateObj}
                calendar={persian}
                locale={persian_fa}
                format="YYYY/MM/DD"
                inputClass="border px-2 py-1 rounded"
              />
            </div>
            <div className="flex flex-col">
              <label>تا تاریخ:</label>
              <DatePicker
                value={endDateObj}
                onChange={setEndDateObj}
                calendar={persian}
                locale={persian_fa}
                format="YYYY/MM/DD"
                inputClass="border px-2 py-1 rounded"
              />
            </div>
          </div>

          {/* فیلتر متن */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="جستجو..."
              className="border px-3 py-2 rounded w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Table columns="7rem 10rem 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr">
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

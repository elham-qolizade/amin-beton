import { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import { DropDownButton } from "../../ui/DropDownButton";
import ConfirmedOrderRow from "./ConfirmedOrderRow";
import { useConfirmedOrders } from "../../hooks/useOrders";
import { Calendar } from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import dayjs from "dayjs";
// import jalali from "@jalalijs/dayjs-jalali";
import jalali from "@fardid/dayjs-jalali";

dayjs.extend(jalali);

const StyledConfirmedOrders = styled.div`
  padding: 4rem;
  border-bottom: 1px solid var(--color-grey-300);
`;

function ConfirmedOrders() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null); // { year: 1403, month: 2, day: 25 }
  const [endDate, setEndDate] = useState(null);

  // آماده‌سازی query params برای فیلتر زمانی
  const queryParams = [];
  if (startDate) {
    const miladiStart = dayjs()
      .calendar("jalali")
      .year(startDate.year)
      .month(startDate.month - 1)
      .date(startDate.day)
      .format("YYYY-MM-DD");
    queryParams.push(`delivery_datetime__gte=${miladiStart} 00:00`);
  }
  if (endDate) {
    const miladiEnd = dayjs()
      .calendar("jalali")
      .year(endDate.year)
      .month(endDate.month - 1)
      .date(endDate.day)
      .format("YYYY-MM-DD");
    queryParams.push(`delivery_datetime__lte=${miladiEnd} 23:59`);
  }
  const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

  if (startDate) queryParams.push(`delivery_datetime__gte=${startDate} 00:00`);
  if (endDate) queryParams.push(`delivery_datetime__lte=${endDate} 23:59`);
  // const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";
  console.log("🔍 Query string:", queryString);
  const { confirmedOrders, isLoading } = useConfirmedOrders(queryString); // فرض بر اینکه این hook از query پشتیبانی کنه
  console.log("📦 Confirmed Orders:", confirmedOrders);
  if (isLoading) return <Spinner />;

  const filteredOrders = confirmedOrders?.filter((order) =>
    JSON.stringify(order).toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log("🔎 Filtered Orders:", filteredOrders);
  return (
    <StyledConfirmedOrders>
      <DropDownButton onClick={() => setIsOpen((s) => !s)}>
        سفارشات تایید شده
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </DropDownButton>

      {isOpen && (
        <>
          {/* فیلتر تاریخ */}
          <div className="flex gap-4 mb-4">
            <div className="flex flex-col">
              <label>از تاریخ:</label>
              <Calendar
                value={startDate}
                onChange={setStartDate}
                shouldHighlightWeekends
                locale="fa"
                calendarClassName="border rounded shadow-sm"
              />
            </div>

            <div className="flex flex-col">
              <label>تا تاریخ:</label>
              <Calendar
                value={endDate}
                onChange={setEndDate}
                shouldHighlightWeekends
                locale="fa"
                calendarClassName="border rounded shadow-sm"
              />
            </div>
          </div>

          {/* سرچ */}
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

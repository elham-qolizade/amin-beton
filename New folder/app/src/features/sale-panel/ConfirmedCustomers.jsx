import { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import Table from "../../ui/Table";
import { DropDownButton } from "../../ui/DropDownButton";
import ConfirmedCustomersRow from "./ConfirmedCustomerRow";

import { useConfirmedCustomers } from "./useCustomers";
import Spinner from "../../ui/Spinner";

const StyledConfirmedCustomers = styled.div`
  padding: 4rem;
  border-bottom: 1px solid var(--color-grey-300);
`;

function ConfirmedCustomers() {
  const [isOpen, setIsOpen] = useState(false);
  const { confirmedCustomers, isLoading } = useConfirmedCustomers();

  if (isLoading) return <Spinner />;

  return (
    <StyledConfirmedCustomers>
      <DropDownButton onClick={() => setIsOpen((s) => !s)}>
        مشتریان احراز شده
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </DropDownButton>

      {isOpen && (
        <Table columns="10rem 10rem 1fr 1fr 1fr 1fr">
          <Table.Header>
            <div>حذف</div>
            <div>ویرایش</div>
            <div>شماره تلفن</div>
            <div>نام</div>
            <div>نام خانوادگی</div>
            <div>شماره مشتری</div>
          </Table.Header>

          <Table.Body
            data={confirmedCustomers}
            render={(customer) => (
              <ConfirmedCustomersRow key={customer.id} customer={customer} />
            )}
          />
        </Table>
      )}
    </StyledConfirmedCustomers>
  );
}

export default ConfirmedCustomers;

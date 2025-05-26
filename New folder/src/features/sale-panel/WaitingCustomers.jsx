/*eslint-disable */
import { useState } from "react";
import styled from "styled-components";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import Table from "../../ui/Table";
import { DropDownButton } from "../../ui/DropDownButton";
import WaitingCustomerRow from "./WaitingCustomerRow";
import Spinner from "../../ui/Spinner";

import { useWaitingCustomers } from "./useCustomers";

const StyledWaitingCustomers = styled.div`
  padding: 4rem;
  border-bottom: 1px solid var(--color-grey-300);
`;

function WaitingCustomers() {
  const [isOpen, setIsOpen] = useState(false);
  const { waitingCustomers, isLoading } = useWaitingCustomers();

  if (isLoading) return <Spinner />;

  return (
    <StyledWaitingCustomers>
      <DropDownButton onClick={() => setIsOpen((s) => !s)}>
        مشتریان منتظر احراز هویت
        {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </DropDownButton>

      {isOpen && (
        <Table columns="10rem 10rem 10rem 1fr 1fr 1fr">
          <Table.Header>
            <div>تایید</div>
            <div>ابطال</div>
            <div>ویرایش</div>
            <div>شماره تلفن</div>
            <div>نام</div>
            <div>نام خانوادگی</div>
          </Table.Header>

          <Table.Body
            data={waitingCustomers}
            render={(customer) => (
              <WaitingCustomerRow key={customer.id} customer={customer} />
            )}
          />
        </Table>
      )}
    </StyledWaitingCustomers>
  );
}

export default WaitingCustomers;

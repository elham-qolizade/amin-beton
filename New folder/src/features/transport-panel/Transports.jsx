/*eslint-disable */
import styled from "styled-components";

import Table from "../../ui/Table";
import TransportsRow from "./TransportsRow";
import Spinner from "../../ui/Spinner";

import { useTransports } from "./useTransports";

const StyledTransports = styled.div`
  padding: 4rem;
  border-bottom: 1px solid var(--color-grey-300);
`;

function Transports() {
  const { transports, isLoadingTransports } = useTransports();

  if (isLoadingTransports) return <Spinner />;

  return (
    <StyledTransports>
      <Table columns="25rem 1fr 1fr 1fr 1fr ">
        <Table.Header>
          <div></div>

          <div> شماره مشتری</div>
          <div>نام پروژه</div>
          <div>نام محصول</div>
          <div> شماره سفارش</div>
        </Table.Header>

        <Table.Body
          data={transports}
          render={(transport) => (
            <TransportsRow key={transport.id} transport={transport} />
          )}
        />
      </Table>
    </StyledTransports>
  );
}

export default Transports;

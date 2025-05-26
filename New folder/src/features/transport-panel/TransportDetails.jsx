/*eslint-disable */
import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import Truck from "./Truck";
import Button from "../../ui/Button";
import Empty from "../../ui/Empty";

import { useTransport } from "./useTransport";
import AddEditTruck from "./AddEditTruck";
import Modal from "../../ui/Modal";
import { useNavigate } from "react-router-dom";

const StyledTransportDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

function TransportDetails() {
  const { transport, isLoading } = useTransport();
  if (isLoading) return <Spinner />;

  return (
    <StyledTransportDetail>
      <Modal>
        <Modal.Open opens="add-truck">
          <Button size="large" onClick={() => setIsOpenAdd((s) => !s)}>
            افزودن
          </Button>
        </Modal.Open>
        <Modal.Window name="add-truck">
          <AddEditTruck />
        </Modal.Window>

        {transport.trucks ? (
          transport.trucks.map((truck) => (
            <Truck key={truck.plate} truck={truck} />
          ))
        ) : (
          <Empty />
        )}
      </Modal>
    </StyledTransportDetail>
  );
}

export default TransportDetails;

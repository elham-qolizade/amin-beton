/*eslint-disable */
import styled from "styled-components";
import LocationInput from "./LocationInput";
import { FaLocationPin } from "react-icons/fa6";

const StyledOrderDetailLocation = styled.div`
  margin-bottom: 10rem;

  & > * {
    height: 40rem;
  }
`;

const Title = styled.h3`
  height: 5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 5rem;
`;

function OrderDetailLocation({ latitude, longitude }) {
  return (
    <StyledOrderDetailLocation>
      <Title>
        <FaLocationPin />
        مکان
      </Title>
      <LocationInput latitude={latitude} longitude={longitude} />
    </StyledOrderDetailLocation>
  );
}

export default OrderDetailLocation;

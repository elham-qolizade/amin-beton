/*eslint-disable */
import styled from "styled-components";

import { CgNametag } from "react-icons/cg";
import { MdOutline123 } from "react-icons/md";

import Button from "../../ui/Button";
import { BsBorderStyle } from "react-icons/bs";
import LocationInput from "./LocationInput";
import LocationShow from "./LocationShow";

const StyledOrderDetailTruck = styled.div`
  color: var(--color-grey-100);
  background-color: var(--color-grey-700);

  /* height: 25rem; */
  padding: 2rem 3rem;
  border: 1px solid black;
  border-radius: 1rem;

  display: grid;
  grid-template-columns: 2fr 1fr 1fr 3fr;
  grid-template-rows: 2.5rem 1fr 1fr 1fr;

  justify-items: center;
  align-items: center;
  grid-gap: 1rem;

  /* 900px */
  @media screen and (max-width: 56.25em) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(auto-fill, minmax(100px, auto));
    grid-row-gap: 4rem;
  }

  .arrived {
    grid-row: 1/2;
    grid-column: 1/2;

    font-size: 1rem;
    color: var(--color-brand-900);
    background-color: var(--color-brand-100);
    padding: 0.3rem 1.4rem;
    border-radius: 1.5rem;

    &.en-route {
      color: var(--color-blue-800);
      background-color: var(--color-blue-400);
    }
  }

  .title {
    grid-row: 2/3;
    grid-column: 1/2;

    font-size: 2rem;
    font-weight: 600;
  }

  .transport-btn {
    grid-row: 2/3;
    grid-column: 2/4;
    justify-self: start;

    font-size: 1rem;
    font-weight: 400;
    padding: 0.5rem 1rem;
  }

  .driver {
    grid-row: 3/4;
    grid-column: 1/2;

    font-size: 1rem;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &__title {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    &__text {
      font-size: 1.4rem;
      font-weight: 900;
    }
  }

  .plate {
    grid-row: 3/4;
    grid-column: 2/3;

    font-size: 1rem;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &__title {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    &__text {
      font-size: 1.4rem;
    }
  }

  .way-bill {
    grid-row: 3/4;
    grid-column: 3/4;

    font-size: 1rem;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &__title {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    &__text {
      font-size: 1.4rem;
    }
  }

  .volume {
    grid-row: 4/5;
    grid-column: 1/2;

    font-size: 1rem;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &__title {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    &__text {
      font-size: 1.4rem;
    }
  }

  .type {
    grid-row: 4/5;
    grid-column: 2/3;

    font-size: 1rem;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &__title {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    &__text {
      font-size: 1.4rem;
    }
  }

  .delivery-date {
    grid-row: 4/5;
    grid-column: 3/4;

    font-size: 1rem;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &__title {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    &__text {
      font-size: 1.4rem;
    }
  }

  .map {
    width: 100%;
    height: 20rem;
    align-self: center;
    justify-self: center;
    grid-column: -2/-1;
    grid-row: 1/-1;

    /* 900px */
    @media screen and (max-width: 56.25em) {
      grid-column: 1/-1;
      grid-row: -2/-1;
    }
  }
`;

function OrderDetailTruck({ truck, latitude, longitude }) {
  return (
    <StyledOrderDetailTruck>
      <div className={`arrived ${truck.arrived ? "" : "en-route"} `}>
        {truck.arrived ? "رسیده" : "در مسیر"}
      </div>
      <div className="title">{truck.title}</div>
      <Button className="transport-btn">اطلاعات ترنسپورت</Button>

      <div className="driver">
        <div className="driver__title">
          <CgNametag /> نام راننده
        </div>
        <div className="driver__text">{truck.driver}</div>
      </div>

      <div className="plate">
        <div className="plate__title">
          <MdOutline123 /> پلاک
        </div>
        <div className="plate__text">{truck.plate}</div>
      </div>

      <div className="way-bill">
        <div className="way-bill__title">
          <MdOutline123 /> بارنامه
        </div>
        <div className="way-bill__text">{truck.wayBill}</div>
      </div>

      <div className="volume">
        <div className="volume__title">
          <BsBorderStyle /> حجم بار
        </div>
        <div className="volume__text">{truck.volume}</div>
      </div>

      <div className="type">
        <div className="type__title">
          <BsBorderStyle /> نوع بار
        </div>
        <div className="type__text">{truck.type}</div>
      </div>

      <div className="delivery-date">
        <div className="delivery-date__title">
          <BsBorderStyle /> نوع بار
        </div>
        <div className="delivery-date__text">{truck.deliveryDate}</div>
      </div>

      <div className="map">
        <LocationShow latitude={latitude} longitude={longitude} />
      </div>
    </StyledOrderDetailTruck>
  );
}

export default OrderDetailTruck;

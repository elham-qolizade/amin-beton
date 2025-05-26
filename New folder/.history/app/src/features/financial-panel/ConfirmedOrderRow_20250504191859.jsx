/* eslint-disable */
import styled from "styled-components";
// import { IoIosPin } from "react-icons/io";

import { BsCardChecklist } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";

// import FactorAndPriceWindow from "./FactorAndPriceWindow";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import FactorAndPriceWindow from "./factor";
import Factor from "./FactorAndPriceWindow";
import { useAddFactorAndPrice } from "./useAddFactor";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { IoIosPin } from "react-icons/io"; // آیکون مکان
import "leaflet/dist/leaflet.css";

const LocationIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--color-green-600);
  transition: all 0.3s;
  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;
const WatchIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--color-brand-600);
  transition: all 0.3s;

  &:hover {
    color: var(--color-brand-800);
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const PreFactorPreviewIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--color-indigo-600);
  transition: all 0.3s;

  &:hover {
    color: var(--color-indigo-800);
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;
const FinanceIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--color-yellow-600);
  transition: all 0.3s;

  &:hover {
    color: var(--color-yellow-800);
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

function ConfirmedOrderRow({ order }) {
  const { isSending, sendFactor } = useAddFactorAndPrice();

  if (!order) {
    return <Table.Row>داده‌ای برای این سفارش یافت نشد.</Table.Row>;
  }

  return (
    <Table.Row>
      <Modal>
        {/* ✅ آیکون پیش‌فاکتور برای باز کردن مودال */}
        <Modal.Open opens="preFactor">
          <PreFactorPreviewIcon>
            <BsCardChecklist />
          </PreFactorPreviewIcon>
        </Modal.Open>

        {/* ✅ مودال پیش‌فاکتور */}
        <Modal.Window name="preFactor">
          <FactorAndPriceWindow
            orderDetails={order} // ✅ ارسال اطلاعات سفارش
            onConfirm={sendFactor}
            disabled={isSending}
          />
        </Modal.Window>

        {/* ✅ نمایش قیمت */}
        <Modal.Open opens="cost">
          <WatchIcon>
            <GrMoney />
          </WatchIcon>
        </Modal.Open>

        <Modal.Window name="cost">
          <Factor
            orderDetails={order}
            onConfirm={sendFactor}
            disabled={isSending}
          />
        </Modal.Window>
        {/* ✅ نمایش موقعیت مکانی پروژه */}
        <Modal.Open opens="location">
          <LocationIcon>
            <IoIosPin />{" "}
            {/* می‌تونی از هر آیکونی مثل IoIosPin یا MdLocationOn استفاده کنی */}
          </LocationIcon>
        </Modal.Open>
        {/* ✅ آیکون گردش مالی */}
        <Modal.Open opens="finance">
          <FinanceIcon>
            <GrMoney />
          </FinanceIcon>
        </Modal.Open>

        <Modal.Window name="finance">
          <div style={{ padding: "1rem" }}>
            <h3>گردش مالی پروژه</h3>
            {/* محتوای گردش مالی، فعلاً یک placeholder */}
            <p>اطلاعات مالی در این بخش نمایش داده می‌شود.</p>
          </div>
        </Modal.Window>

        <Modal.Window name="location">
          <div style={{ padding: "1rem" }}>
            <h3>آدرس پروژه:</h3>
            <p>{order.project.address || "آدرس ثبت نشده است."}</p>

            {order.project.latitude && order.project.longitude && (
              <div style={{ marginTop: "1rem" }}>
                {/* اینجا بعداً نقشه قرار می‌گیره */}
              </div>
            )}
          </div>
        </Modal.Window>

        <div>{order.order_name}</div>
        <div>{order.order_id}</div>
        <div>{order.project.title}</div>

        <div>{order.project.user_fullname}</div>
        <div>{order.project.user_phone}</div>
        <div>{order.project.user_username}</div>
        <div>{order.project.user_id}</div>
      </Modal>
    </Table.Row>
  );
}

export default ConfirmedOrderRow;

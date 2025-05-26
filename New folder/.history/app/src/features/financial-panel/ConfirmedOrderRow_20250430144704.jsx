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
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";



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

function ConfirmedOrderRow({ order }) {
  const { isSending, sendFactor } = useAddFactorAndPrice();

  if (!order) {
    return <Table.Row>داده‌ای برای این سفارش یافت نشد.</Table.Row>;
  }
  const LocationModal = ({ order }) => {
    // چاپ مقادیر برای تست
    console.log("Latitude:", order.project.latitude);
    console.log("Longitude:", order.project.longitude);
  
    // برای دادن مختصات صحیح به Marker
    const lat = parseFloat(order.project.latitude) || 0;
    const long = parseFloat(order.project.longitude) || 0;
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
        {/* ✅ دکمه موقعیت مکانی */}
        <Modal>
      <Modal.Open opens="location">
        <LocationIcon>
          <IoIosPin />
        </LocationIcon>
      </Modal.Open>

      <Modal.Window name="location">
        <div style={{ height: "300px", width: "100%" }}>
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 2000, // مقیاس نقشه
              center: [long, lat], // مرکز نقشه
            }}
            style={{ height: "100%", width: "100%" }}
          >
            <Geographies geography="https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: {
                        fill: "#D6D6DA",
                        outline: "none",
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* افزودن Marker برای موقعیت */}
            <Marker coordinates={[long, lat]}>
              <circle r={8} fill="#F53" />
              <text textAnchor="middle" y={-10} style={{ fontSize: "12px", fill: "#F53" }}>
                {order.project.address || "آدرس ثبت نشده"}
              </text>
            </Marker>
          </ComposableMap>
        </div>
      </Modal.Window>
    </Modal>
  );
};


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

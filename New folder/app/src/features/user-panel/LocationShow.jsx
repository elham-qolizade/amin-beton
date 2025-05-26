/*eslint-disable */
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styled from "styled-components";

const StyledLocationShow = styled.div`
  width: 100%;
  height: 100%;

  .leaflet-container {
    width: 100%;
    height: 100%;
  }
`;

function LocationShow({ latitude, setLatitude, longitude, setLongitude }) {
  // useEffect(() => {
  //   const map = document.querySelector(".leaflet-container");
  //   if (map) {
  //     map?._leaflet_map?.invalidateSize();
  //   }
  // }, []);
  return (
    <StyledLocationShow>
      <MapContainer
        className="map"
        center={[latitude, longitude]}
        zoom={11}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>مکان انتخاب شده برای پروژه</Popup>
        </Marker>

        <ChangeCenter position={[latitude, longitude]} />
        <DetectClick setLatitude={setLatitude} setLongitude={setLongitude} />
      </MapContainer>
    </StyledLocationShow>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick({ setLatitude, setLongitude }) {
  useMapEvents({
    click: (e) => {
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
    },
  });
}

export default LocationShow;

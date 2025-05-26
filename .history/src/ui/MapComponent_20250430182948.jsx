import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import L from "leaflet";

// آیکون مارکر سفارشی
const customIcon = new L.Icon({
  iconUrl:
    "https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// جستجو در نقشه (فقط مختصات می‌گیره)
const SearchControl = ({ onLocationSelect }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: false,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });
  
    map.addControl(searchControl);
  
    // جابجایی به سمت راست
    const controlEl = document.querySelector(".leaflet-control.geosearch");
    if (controlEl) {
      controlEl.style.left = "auto";
      controlEl.style.right = "10px";
      controlEl.style.top = "10px";
      controlEl.style.maxWidth = "300px";
      controlEl.style.zIndex = "1000";
    }
  
    map.on("geosearch/showlocation", (e) => {
      const { x, y } = e.location;
      onLocationSelect([y, x]);
    });
  
    return () => map.removeControl(searchControl);
  }, [map, onLocationSelect]);
  ;

// کلیک روی نقشه برای انتخاب نقطه
const LocationPicker = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect([lat, lng]);
    },
  });
  return null;
};

// مارکر برای نمایش مکان انتخاب‌شده
const LocationMarker = ({ position }) =>
  position ? (
    <Marker position={position} icon={customIcon}>
      <Popup>موقعیت انتخاب‌شده</Popup>
    </Marker>
  ) : null;

// کامپوننت اصلی نقشه
const MapComponent = ({
  latitude,
  longitude,
  onLocationSelect,
  width = "300px",
  height = "150px",
}) => {
  const [position, setPosition] = useState(
    latitude && longitude ? [latitude, longitude] : null
  );

  // وقتی کاربر مکانی انتخاب کرد
  const handleLocationSelect = (coords) => {
    setPosition(coords); // نمایش مارکر
    onLocationSelect && onLocationSelect(coords); // ارسال به بیرون
  };

  return (
    <MapContainer
      center={position || [35.6892, 51.389]}
      zoom={13}
      style={{
        width,
        height,
        borderRadius: "10px",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <SearchControl onLocationSelect={handleLocationSelect} />
      <LocationPicker onLocationSelect={handleLocationSelect} />
      <LocationMarker position={position} />
    </MapContainer>
  );
};

export default MapComponent;

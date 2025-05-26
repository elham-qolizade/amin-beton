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
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// جستجو در نقشه
const SearchControl = ({ onLocationSelect }) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();
    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    // وقتی جستجو انجام شد، مختصات انتخابی را دریافت کن
    map.on("geosearch/showlocation", (e) => {
      const { x, y } = e.location;
      onLocationSelect([y, x]); // ارسال مختصات به فرم
    });

    return () => map.removeControl(searchControl);
  }, [map, onLocationSelect]);

  return null;
};

// انتخاب نقطه روی نقشه
const LocationMarker = ({ position }) => {
  return position ? (
    <Marker position={position} icon={customIcon}>
      <Popup>موقعیت راننده</Popup>
    </Marker>
  ) : null;
};

// اضافه کردن رویداد کلیک روی نقشه برای انتخاب مکان
const LocationPicker = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onLocationSelect([lat, lng]); // ارسال مختصات به فرم
    },
  });

  return null;
};

const MapComponent = ({
  latitude,
  longitude,
  onLocationSelect,
  width = "300px",
  height = "150px",
}) => {
  // موقعیت نقشه را تنظیم می‌کنیم
  const position =
    latitude && longitude ? [latitude, longitude] : [35.6892, 51.389]; // پیش‌فرض تهران

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{
        width: width, // دریافت عرض از props
        height: height, // دریافت ارتفاع از props
        borderRadius: "10px", // گوشه‌های گرد مثل فیگما
        overflow: "hidden",
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SearchControl onLocationSelect={onLocationSelect} />
      <LocationPicker onLocationSelect={onLocationSelect} />{" "}
      {/* اضافه کردن رویداد کلیک */}
      <LocationMarker position={position} />
    </MapContainer>
  );
};

export default MapComponent;

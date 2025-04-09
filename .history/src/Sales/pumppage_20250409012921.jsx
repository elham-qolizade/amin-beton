import React from "react";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../ui/Button";
// import { useParams, useNavigate } from "react-router-dom";
import Modal from "../pages/Modal";
export default function () {
  return (
    <div>
      <div className="flex flex-col min-h-screen p-6 text-white bg-Bokara-Grey">
        <div className="container w-full max-w-5xl p-8 bg-gray-800 rounded-xl">
          <h1 className="mb-8 text-sm font-bold text-center md:text-2xl">
            خرید برای <br />
          </h1>

          <div className="mb-8">
            <h2 className="text-lg font-bold">پمپ‌ها</h2>
            <div className="flex flex-row flex-wrap gap-6 mt-4 mb-8"></div>
            <div className="mb-8">
              <h3 className="text-lg font-bold">زیرمجموعه‌های پمپ</h3>
              <div className="flex flex-row flex-wrap gap-6 mt-4"></div>
            </div>
          </div>

          {/* دکمه افزودن پمپ‌ها */}
          <div className="flex justify-center gap-6 px-10 mt-10">
            <Button className="px-10">افزودن پمپ‌ها</Button>
          </div>

          {/* نمایش انتخاب‌های پمپ‌ها */}

          <Button
            className="px-10"
            onClick={() => {
              navigate(`/VibratorPage/${orderId}`); // مقدار orderId را مقداردهی کنید
            }}
          >
            ادامه
          </Button>
        </div>
      </div>
    </div>
  );
}

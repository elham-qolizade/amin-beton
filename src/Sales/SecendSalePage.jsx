import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Pump, Vibrator } from "../constans/index";
import { useNavigate } from "react-router-dom";
const SecendSalePage = () => {
  const [selectedPump, setSelectedPump] = useState(null);
  const [hoveredPump, setHoveredPump] = useState(null);
  const [selectedVibrator, setSelectedVibrator] = useState(null);
  const [hoveredVibrator, setHoveredVibrator] = useState(null);
  const navigate = useNavigate();
  const getBorderColor = (id, selectedId, hoveredId) => {
    return selectedId === id || hoveredId === id
      ? "border-School-Bus"
      : "border-transparent";
  };

  return (
    <div className="flex flex-col min-h-screen p-6 text-white bg-Bokara-Grey">
      <div className="w-full max-w-5xl p-8 bg-gray-800">
        <h1 className="mb-8 text-2xl font-bold text-center">
          خرید برای پروژه "نام پروژه"
        </h1>

        {/* پمپ */}
        <div className="grid grid-rows-2 gap-6 px-10 mb-8">
          <div>
            <h2 className="mb-4 text-xl font-semibold text-start">پمپ</h2>
            <div className="grid grid-cols-4 gap-8">
              {Pump.map((pump) => (
                <div
                  key={pump.id}
                  className={`relative rounded-lg cursor-pointer flex flex-col justify-center items-center bg-gray-700 border-2 ${getBorderColor(
                    pump.id,
                    selectedPump,
                    hoveredPump
                  )}`}
                  onMouseEnter={() => setHoveredPump(pump.id)}
                  onMouseLeave={() => setHoveredPump(null)}
                  onClick={() => setSelectedPump(pump.id)}
                >
                  <img
                    src={pump.backgroundImage}
                    alt={pump.name}
                    className="object-cover w-full h-32 rounded-lg"
                  />
                  <span
                    className={`absolute top-2 left-2 w-4 h-4 rounded-full ${
                      selectedPump === pump.id || hoveredPump === pump.id
                        ? "bg-School-Bus"
                        : "bg-white"
                    } z-10`}
                  ></span>
                  <span
                    className={`absolute inset-0 flex items-center justify-center text-sm bg-black bg-opacity-50 px-2 py-1 rounded-md ${
                      selectedPump === pump.id || hoveredPump === pump.id
                        ? "text-School-Bus"
                        : "text-white"
                    }`}
                  >
                    {pump.name}
                  </span>
                </div>
              ))}
            </div>
            <button className="flex py-1 mt-4 text-white transition border border-white px-14 hover:bg-School-Bus">
              انتخاب پمپ
            </button>
          </div>

          {/* ویبراتور */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-start">ویبراتور</h2>
            <div className="grid grid-cols-4 gap-8">
              {Vibrator.map((vibrator) => (
                <div
                  key={vibrator.id}
                  className={`relative rounded-lg cursor-pointer flex flex-col justify-center items-center bg-gray-700 border-2 ${getBorderColor(
                    vibrator.id,
                    selectedVibrator,
                    hoveredVibrator
                  )}`}
                  onMouseEnter={() => setHoveredVibrator(vibrator.id)}
                  onMouseLeave={() => setHoveredVibrator(null)}
                  onClick={() => setSelectedVibrator(vibrator.id)}
                >
                  <img
                    src={vibrator.backgroundImage}
                    alt={vibrator.name}
                    className="object-cover w-full h-32 rounded-lg"
                  />
                  <span
                    className={`absolute top-2 left-2 w-4 h-4 rounded-full ${
                      selectedVibrator === vibrator.id ||
                      hoveredVibrator === vibrator.id
                        ? "bg-School-Bus"
                        : "bg-white"
                    } z-10`}
                  ></span>
                  <span
                    className={`absolute inset-0 flex items-center justify-center text-sm bg-black bg-opacity-50 px-2 py-1 rounded-md ${
                      selectedVibrator === vibrator.id ||
                      hoveredVibrator === vibrator.id
                        ? "text-School-Bus"
                        : "text-white"
                    }`}
                  >
                    {vibrator.name}
                  </span>
                </div>
              ))}
            </div>
            <button className="flex py-1 mt-4 text-white transition border border-white px-14 hover:bg-School-Bus">
              انتخاب ویبراتور
            </button>
          </div>
        </div>

        {/* فرم */}
        <div className="mt-20 mb-8">
          <Formik
            initialValues={{
              maxPiping: "",
              height: "",
              payment: "",
              description: "",
            }}
            onSubmit={(values) => {
              console.log("Form Data:", values);
            }}
          >
            {() => (
              <Form className="px-10 space-y-8 ">
                <Field
                  type="text"
                  name="maxPiping"
                  placeholder="حداکثر میزان لوله کشی"
                  className="w-full p-3 text-white placeholder-gray-400 border border-white bg-Bokara-Grey focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <Field
                  type="text"
                  name="height"
                  placeholder="ارتفاع بتن ریزی"
                  className="w-full p-3 text-white placeholder-gray-400 border border-white bg-Bokara-Grey focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <Field
                  type="text"
                  name="payment"
                  placeholder="نحوه تسویه"
                  className="w-full p-3 text-white placeholder-gray-400 border border-white bg-Bokara-Grey focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <Field
                  as="textarea"
                  name="description"
                  placeholder="توضیحات"
                  rows="4"
                  className="w-full p-3 text-white placeholder-gray-400 border border-white bg-Bokara-Grey focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                  type="submit"
                  onClick={() => navigate("/UserForm ")}
                  className="w-2/3 py-3 font-medium text-gray-200 transition border border-white bg-Bokara-Grey hover:bg-School-Bus"
                >
                  ثبت سفارش جهت بررسی
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SecendSalePage;

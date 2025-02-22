import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Pump, Vibrator } from "../constans/index";
import { useNavigate } from "react-router-dom";
import ButtonProjectComponent from "../ui/ButtonProject";
import Input from "./../ui/Input";

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
      <div className="container w-full max-w-5xl p-8 bg-gray-800">
        <h1 className="mb-8 text-sm font-bold text-center md:text-2xl">
          خرید برای پروژه "نام پروژه"
        </h1>

        {/* پمپ و ویبراتور (فقط دسکتاپ) */}
        <div className="hidden grid-rows-2 gap-6 px-10 mb-8 md:grid">
          <div>
            <h2 className="mb-4 text-xl font-semibold text-start">پمپ</h2>
            <div className="grid grid-cols-4 gap-8">
              {Pump.map((pump) => (
                <div
                  key={pump.id}
                  className={`relative rounded-lg cursor-pointer flex flex-col justify-center items-center bg-Bokara-Grey border-2 ${
                    selectedPump === pump.id
                      ? "border-School-Bus"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedPump(pump.id)}
                >
                  <img
                    src={pump.backgroundImage}
                    alt={pump.name}
                    className="object-cover w-full h-32 rounded-lg"
                  />
                  <span
                    className={`absolute inset-0 flex items-center justify-center px-2 py-1 text-sm bg-black bg-opacity-50 rounded-md ${
                      selectedPump === pump.id
                        ? "text-School-Bus"
                        : "text-white"
                    }`}
                  >
                    {pump.name}
                  </span>
                  {/* دایره انتخاب */}
                  <div
                    className={`absolute w-3 h-3 rounded-full top-2 left-2 ${
                      selectedPump === pump.id
                        ? "bg-School-Bus"
                        : "bg-Looking-Glass"
                    }`}
                  ></div>
                </div>
              ))}
            </div>

            <ButtonProjectComponent className="py-2 mt-10 text-white border-white md:w-48">
              انتخاب پمپ
            </ButtonProjectComponent>
          </div>

          {/* ویبراتور */}
          <div>
            <h2 className="mb-4 text-xl font-semibold text-start">ویبراتور</h2>
            <div className="grid grid-cols-4 gap-8">
              {Vibrator.map((vibrator) => (
                <div
                  key={vibrator.id}
                  className={`relative rounded-lg cursor-pointer flex flex-col justify-center items-center bg-Bokara-Grey border-2 ${
                    selectedVibrator === vibrator.id
                      ? "border-School-Bus"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedVibrator(vibrator.id)}
                >
                  <img
                    src={vibrator.backgroundImage}
                    alt={vibrator.name}
                    className="object-cover w-full h-32 rounded-lg"
                  />
                  <span
                    className={`absolute inset-0 flex items-center justify-center px-2 py-1 text-sm bg-black bg-opacity-50 rounded-md ${
                      selectedVibrator === vibrator.id
                        ? "text-School-Bus"
                        : "text-white"
                    }`}
                  >
                    {vibrator.name}
                  </span>
                  {/* دایره انتخاب */}
                  <div
                    className={`absolute w-3 h-3 rounded-full top-2 left-2 ${
                      selectedVibrator === vibrator.id
                        ? "bg-School-Bus"
                        : "bg-Looking-Glass"
                    }`}
                  ></div>
                </div>
              ))}
            </div>

            <ButtonProjectComponent className="py-2 mt-10 text-white border-white md:w-48">
              انتخاب ویبراتور
            </ButtonProjectComponent>
          </div>
        </div>

        {/* فرم اطلاعات */}
        <div className="mt-20 mb-8">
          <Formik
            initialValues={{
              height: "",
              payment: "",
              description: "",
              pumpCount: "",
              vibratorCount: "",
              maxPiping: "",
              pumpType: "",
              vibratorType: "",
            }}
            onSubmit={(values) => {
              console.log("Form Data:", values);
            }}
          >
            {() => (
              <Form className="flex flex-col items-center px-10 space-y-8">
                <div className="flex flex-col w-full gap-4 md:hidden">
                  <Field
                    as="select"
                    name="pumpType"
                    className="w-full p-2 pl-4 text-left text-white border rounded ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus rounde placeholder:text-right border-Looking-Glass focus:border-School-Bus"
                  >
                    <option value="" className="text-right ">
                      انتخاب نوع پمپ
                    </option>
                    {Pump.map((pump) => (
                      <option
                        key={pump.id}
                        value={pump.name}
                        className="text-black"
                      >
                        {pump.name}
                      </option>
                    ))}
                  </Field>
                  <Input
                    type="number"
                    name="pumpCount"
                    placeholder="تعداد پمپ"
                    className="p-2 text-left text-white bg-gray-700 border rounded placeholder:text-right border-Looking-Glass focus:border-yellow-400"
                    dir="ltr"
                  />
                  <Field
                    as="select"
                    name="vibratorType"
                    className="w-full p-2 pl-4 text-left border rounded bg-Bokara-Grey placeholder:text-right border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus"
                  >
                    <option value="" className="text-right text-b-gray ">
                      انتخاب نوع ویبراتور
                    </option>
                    {Vibrator.map((vibrator) => (
                      <option
                        key={vibrator.id}
                        value={vibrator.name}
                        className="text-black"
                      >
                        {vibrator.name}
                      </option>
                    ))}
                  </Field>
                  <Input
                    type="number"
                    name="vibratorCount"
                    placeholder="تعداد ویبراتور"
                    className="p-2 text-left text-white bg-gray-700 border rounded placeholder:text-right border-Looking-Glass focus:border-yellow-400"
                    dir="ltr"
                  />
                </div>
                <Input
                  type="text"
                  name="maxPiping"
                  placeholder="حداکثر میزان لوله‌کشی"
                  className="p-2 text-left text-white bg-gray-700 border rounded placeholder:text-right border-Looking-Glass focus:border-yellow-400"
                  dir="ltr"
                />
                <Input
                  type="text"
                  name="height"
                  placeholder="ارتفاع بتن ریزی"
                  className="p-2 text-left text-white bg-gray-700 border rounded placeholder:text-right border-Looking-Glass focus:border-yellow-400"
                  dir="ltr"
                />

                <Input
                  type="text"
                  name="payment"
                  placeholder="نحوه تسویه"
                  className="p-2 text-left text-white bg-gray-700 border rounded placeholder:text-right border-Looking-Glass focus:border-yellow-400"
                  dir="ltr"
                />

                <textarea
                  name="description"
                  placeholder="توضیحات"
                  className="w-full h-24 px-4 py-2 text-white border rounded focus:outline-none focus:ring-1 focus:ring-School-Bus border-Looking-Glass bg-Bokara-Grey"
                />

                {/* ورودی‌های اضافی مخصوص موبایل */}

                <ButtonProjectComponent
                  type="submit"
                  onClick={() => navigate("/UserForm")}
                  className="w-40 py-2 md:w-96 md:py-2"
                >
                  ثبت سفارش جهت بررسی
                </ButtonProjectComponent>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default SecendSalePage;

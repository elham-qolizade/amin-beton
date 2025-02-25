import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import ButtonProjectComponent from "../ui/ButtonProject";
import Input from "./../ui/Input";
import axios from "axios";
const SecendSalePage = () => {
  const [pumps, setPumps] = useState([]); // مقدار اولیه آرایه باشد
  const [vibrators, setVibrators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPump, setSelectedPump] = useState(null);
  const [selectedVibrator, setSelectedVibrator] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://amin-beton-back.chbk.app/api/sales-pump/")
      .then((res) => setPumps(res.data))
      .catch((err) => console.error("خطا در دریافت لیست پمپ‌ها:", err));

    axios
      .get("https://amin-beton-back.chbk.app/api/sales-vibrator/")
      .then((res) => setVibrators(res.data))
      .catch((err) => console.error("خطا در دریافت لیست ویبراتورها:", err));
  }, []);

  if (loading) {
    return <div className="text-center text-white">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">خطا: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen p-6 text-white bg-Bokara-Grey">
      <div className="container w-full max-w-5xl p-8 bg-gray-800">
        <h1 className="mb-8 text-sm font-bold text-center md:text-2xl">
          خرید برای پروژه "نام پروژه"
        </h1>

        <div className="hidden grid-rows-2 gap-6 px-10 mb-8 md:grid">
          <div>
            <h2 className="mb-4 text-xl font-semibold text-start">پمپ</h2>
            <div className="grid grid-cols-4 gap-8">
              {pumps.length > 0 ? (
                pumps.map((pump) => (
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
                      src={pump.image}
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
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">
                  داده‌ای برای نمایش وجود ندارد
                </p>
              )}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-start">ویبراتور</h2>
            <div className="grid grid-cols-4 gap-8">
              {vibrators.length > 0 ? (
                vibrators.map((vibrator) => (
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
                      src={vibrator.image}
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
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">
                  داده‌ای برای نمایش وجود ندارد
                </p>
              )}
            </div>
          </div>
        </div>

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
                    className="w-full p-2 pl-4 text-left text-white border rounded bg-Bokara-Grey"
                  >
                    <option value="">انتخاب نوع پمپ</option>
                    {pumps.map((pump) => (
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
                    className="p-2 text-left text-white bg-gray-700 border rounded"
                  />

                  <Field
                    as="select"
                    name="vibratorType"
                    className="w-full p-2 pl-4 text-left border rounded bg-Bokara-Grey"
                  >
                    <option value="">انتخاب نوع ویبراتور</option>
                    {vibrators.map((vibrator) => (
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
                    className="p-2 text-left text-white bg-gray-700 border rounded"
                  />
                </div>

                <ButtonProjectComponent
                  type="submit"
                  onClick={() => navigate("/UserForm")}
                  className="w-40 py-2 md:w-96"
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

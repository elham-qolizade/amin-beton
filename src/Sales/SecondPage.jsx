// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function SecondPage() {
//   const [vibrators, setVibrators] = useState([]);
//   const [pumps, setPumps] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedVibrator, setSelectedVibrator] = useState(null);
//   const [selectedPump, setSelectedPump] = useState(null);
//   const navigate = useNavigate();

//   // دریافت داده‌های ویبراتورها
//   const fetchVibrators = async () => {
//     try {
//       setLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         console.log("توکن موجود نیست، هدایت به صفحه ورود...");
//         navigate("/LoginForm");
//         return;
//       }

//       const response = await axios.get(
//         "https://amin-beton-back.chbk.app/api/sales-vibrator/",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       console.log("داده‌های ویبراتورهای دریافتی از API:", response.data);
//       setVibrators(response.data);
//     } catch (err) {
//       if (err.response && err.response.status === 401) {
//         console.log("توکن منقضی شده، در حال تلاش برای دریافت توکن جدید...");
//         // تلاش برای دریافت توکن جدید
//       } else {
//         console.error("خطا در دریافت لیست ویبراتورها:", err);
//         setError("مشکلی در دریافت داده‌ها رخ داده است");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // دریافت داده‌های پمپ
//   const fetchPumps = async () => {
//     try {
//       setLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       if (!accessToken) {
//         console.log("توکن موجود نیست، هدایت به صفحه ورود...");
//         navigate("/LoginForm");
//         return;
//       }

//       const response = await axios.get(
//         "https://amin-beton-back.chbk.app/api/sales-pump/",
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       console.log("داده‌های پمپ‌های دریافتی از API:", response.data);
//       setPumps(response.data);
//     } catch (err) {
//       if (err.response && err.response.status === 401) {
//         console.log("توکن منقضی شده، در حال تلاش برای دریافت توکن جدید...");
//         // تلاش برای دریافت توکن جدید
//       } else {
//         console.error("خطا در دریافت لیست پمپ‌ها:", err);
//         setError("مشکلی در دریافت داده‌ها رخ داده است");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVibrators();
//     fetchPumps();
//   }, []);

//   // اگر در حال بارگذاری داده‌ها هستیم
//   if (loading) {
//     return <div className="text-center text-white">در حال بارگذاری...</div>;
//   }

//   // اگر خطا در دریافت داده‌ها داشتیم
//   if (error) {
//     return <div className="text-center text-red-500">خطا: {error}</div>;
//   }

//   return (
//     <div className="hidden grid-rows-2 gap-6 px-10 mb-8 md:grid">
//       {/* بخش پمپ‌ها */}
//       <div>
//         <h2 className="mb-4 text-xl font-semibold text-start">پمپ</h2>
//         <div className="grid grid-cols-4 gap-8">
//           {pumps.length > 0 ? (
//             pumps.map((pump) => (
//               <div
//                 key={pump.id}
//                 className={`relative rounded-lg cursor-pointer flex flex-col justify-center items-center bg-Bokara-Grey border-2 ${
//                   selectedPump === pump.id
//                     ? "border-School-Bus"
//                     : "border-transparent"
//                 }`}
//                 onClick={() => setSelectedPump(pump.id)}
//               >
//                 <span
//                   className={`absolute inset-0 flex items-center justify-center px-2 py-1 text-sm bg-black bg-opacity-50 rounded-md ${
//                     selectedPump === pump.id ? "text-School-Bus" : "text-white"
//                   }`}
//                 >
//                   {pump.title}{" "}
//                   {/* اینجا از `title` به‌جای `name` استفاده می‌کنیم */}
//                 </span>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-400">
//               داده‌ای برای نمایش وجود ندارد
//             </p>
//           )}
//         </div>
//       </div>

//       {/* بخش ویبراتورها */}
//       <div>
//         <h2 className="mb-4 text-xl font-semibold text-start">ویبراتور</h2>
//         <div className="grid grid-cols-4 gap-8">
//           {vibrators.length > 0 ? (
//             vibrators.map((vibrator) => (
//               <div
//                 key={vibrator.id}
//                 className={`relative rounded-lg cursor-pointer flex flex-col justify-center items-center bg-Bokara-Grey border-2 ${
//                   selectedVibrator === vibrator.id
//                     ? "border-School-Bus"
//                     : "border-transparent"
//                 }`}
//                 onClick={() => setSelectedVibrator(vibrator.id)}
//               >
//                 <img
//                   src={vibrator.image} // فرض بر این است که ویبراتورها تصویر دارند
//                   alt={vibrator.title} // از `title` به‌جای `name` استفاده می‌کنیم
//                   className="object-cover w-full h-32 rounded-lg"
//                 />
//                 <span
//                   className={`absolute inset-0 flex items-center justify-center px-2 py-1 text-sm bg-black bg-opacity-50 rounded-md ${
//                     selectedVibrator === vibrator.id
//                       ? "text-School-Bus"
//                       : "text-white"
//                   }`}
//                 >
//                   {vibrator.title}{" "}
//                   {/* از `title` به‌جای `name` استفاده می‌کنیم */}
//                 </span>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-400">
//               داده‌ای برای نمایش وجود ندارد
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SecondPage;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import ButtonProjectComponent from "../ui/ButtonProject";
import Input from "./../ui/Input";
import { useNavigate } from "react-router-dom";

function SecondPage() {
  const [vibrators, setVibrators] = useState([]);
  const [pumps, setPumps] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPump, setSelectedPump] = useState(null);
  const [selectedVibrator, setSelectedVibrator] = useState(null);
  const [newOrder, setNewOrder] = useState({
    project: "",
    height: "",
    payment: "",
    description: "",
    pumpCount: "",
    vibratorCount: "",
    maxPiping: "",
    pumpType: "",
    vibratorType: "",
    concrete_pouring_type: "",
    concrete_resistance_class: "",
    concrete_type: "",
    delivery_datetime: "",
  });
  const navigate = useNavigate(); // برای هدایت به صفحه ورود

  const fetchData = async (url, setData) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        console.log("توکن موجود نیست، هدایت به صفحه ورود...");
        navigate("/LoginForm");
        return;
      }
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("داده‌های دریافتی:", response.data); // چاپ داده‌ها در کنسول
      setData(response.data);
    } catch (err) {
      console.error(`خطا در دریافت داده‌ها از ${url}:`, err);
      setError("مشکلی در دریافت داده‌ها رخ داده است");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(
      "https://amin-beton-back.chbk.app/api/sales-vibrator/",
      setVibrators
    );
    fetchData("https://amin-beton-back.chbk.app/api/sales-pump/", setPumps);
    fetchData("https://amin-beton-back.chbk.app/api/projects/", setProjects); // اضافه کردن فراخوانی برای پروژه‌ها
  }, []);

  if (loading)
    return <div className="text-center text-white">در حال بارگذاری...</div>;
  if (error)
    return <div className="text-center text-red-500">خطا: {error}</div>;

  const handleSubmit = async (values) => {
    console.log("اطلاعات ارسالی:", values);
    try {
      const accessToken = localStorage.getItem("accessToken");

      // تبدیل تاریخ به فرمت YYYY-MM-DDThh:mm
      if (values.delivery_datetime) {
        const date = new Date(values.delivery_datetime);
        const formattedDate = date.toISOString().slice(0, 16); // تبدیل به فرمت YYYY-MM-DDThh:mm
        values.delivery_datetime = formattedDate;
      }

      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/",
        values,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      console.log("✅ سفارش با موفقیت ثبت شد:", response.data);
      alert("سفارش با موفقیت ثبت شد!");
    } catch (err) {
      console.error("❌ خطا در ارسال سفارش:", err.response?.data || err);
      alert("مشکلی در ثبت سفارش رخ داده است.");
    }
  };

  const handleDateChange = (e) => {
    setNewOrder({
      ...newOrder,
      delivery_datetime: e.target.value,
    });
  };

  return (
    <div className="flex flex-col min-h-screen p-6 text-white bg-Bokara-Grey">
      <div className="container w-full max-w-5xl p-8 bg-gray-800">
        <h1 className="mb-8 text-sm font-bold text-center md:text-2xl">
          ثبت سفارش برای پروژه
        </h1>

        <div className="mt-20 mb-8">
          <Formik initialValues={newOrder} onSubmit={handleSubmit}>
            {() => (
              <Form className="flex flex-col items-center px-10 space-y-8">
                {/* انتخاب پروژه */}
                <Field
                  as="select"
                  name="project"
                  className="w-full p-2 text-white bg-Bokara-Grey border rounded"
                >
                  <option value="">انتخاب پروژه</option>
                  {projects && projects.length > 0 ? (
                    projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>پروژه‌ها بارگذاری نشدند</option>
                  )}
                </Field>

                {/* انتخاب نوع پمپ */}
                <Field
                  as="select"
                  name="pumpType"
                  className="w-full p-2 text-white bg-Bokara-Grey border rounded"
                >
                  <option value="">انتخاب نوع پمپ</option>
                  {pumps && pumps.length > 0 ? (
                    pumps.map((pump) => (
                      <option key={pump.id} value={pump.name}>
                        {pump.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>پمپ‌ها بارگذاری نشدند</option>
                  )}
                </Field>

                {/* تعداد پمپ */}
                <Input
                  type="number"
                  name="pumpCount"
                  placeholder="تعداد پمپ"
                  className="w-full p-2 text-white bg-gray-700 border rounded"
                />

                {/* انتخاب نوع ویبراتور */}
                <Field
                  as="select"
                  name="vibratorType"
                  className="w-full p-2 text-white bg-School-Bus border rounded"
                >
                  <option value="">انتخاب نوع ویبراتور</option>
                  {vibrators && vibrators.length > 0 ? (
                    vibrators.map((vibrator) => (
                      <option key={vibrator.id} value={vibrator.name}>
                        {vibrator.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>ویبراتورها بارگذاری نشدند</option>
                  )}
                </Field>

                {/* تعداد ویبراتور */}
                <Input
                  type="number"
                  name="vibratorCount"
                  placeholder="تعداد ویبراتور"
                  className="w-full p-2 text-white bg-gray-700 border rounded"
                />

                {/* ارتفاع */}
                <Input
                  type="text"
                  name="height"
                  placeholder="ارتفاع"
                  className="w-full p-2 text-white bg-gray-700 border rounded"
                />

                {/* روش پرداخت */}
                <Input
                  type="text"
                  name="payment"
                  placeholder="روش پرداخت"
                  className="w-full p-2 text-white bg-gray-700 border rounded"
                />

                {/* توضیحات */}
                <Input
                  type="text"
                  name="description"
                  placeholder="توضیحات"
                  className="w-full p-2 text-white bg-gray-700 border rounded"
                />

                {/* انتخاب نوع بتن */}
                <Field
                  as="select"
                  name="concrete_type"
                  className="w-full p-2 text-white bg-Bokara-Grey border rounded"
                >
                  <option value="">نوع بتن</option>
                  <option value="1">نوع 1</option>
                  <option value="2">نوع 2</option>
                  <option value="3">نوع 3</option>
                </Field>

                {/* مقطع بتن ریزی */}
                <Field
                  as="select"
                  name="concrete_pouring_type"
                  className="w-full p-2 text-white bg-Bokara-Grey border rounded"
                >
                  <option value="">مقطع بتن ریزی</option>
                  <option value="1">مقطع 1</option>
                  <option value="2">مقطع 2</option>
                  <option value="3">مقطع 3</option>
                </Field>

                {/* رده مقاومتی بتن */}
                <Field
                  as="select"
                  name="concrete_resistance_class"
                  className="w-full p-2 text-white bg-Bokara-Grey border rounded"
                >
                  <option value="">رده مقاومتی بتن</option>
                  <option value="1">رده 1</option>
                  <option value="2">رده 2</option>
                  <option value="3">رده 3</option>
                </Field>

                {/* تاریخ و زمان تحویل */}
                <input
                  type="datetime-local"
                  name="delivery_datetime"
                  value={newOrder.delivery_datetime} // مقداردهی اولیه
                  onChange={handleDateChange} // تغییرات تاریخ
                  className="w-full p-3 border border-gray-300 rounded"
                  required
                />
                <ButtonProjectComponent
                  type="submit"
                  className="w-40 py-2 md:w-96"
                >
                  ثبت سفارش
                </ButtonProjectComponent>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SecondPage;

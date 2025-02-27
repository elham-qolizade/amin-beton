// import React, { useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import axios from "axios";

import logo from "../assets/images/84c17d4db54552e3ecc58781c8cefc7a.png";
// import { ProjectFields } from "../constans/index";
import ButtonProject from "../ui/ButtonProject";

// const ProjectForm = () => {
//   const navigate = useNavigate();

//   const initialValues = useMemo(() => {
//     return ProjectFields.reduce(
//       (acc, field) => {
//         acc[field.name] = "";
//         return acc;
//       },
//       {
//         projectDate: "",
//         latitude: "",
//         longitude: "",
//         address: "",
//       }
//     );
//   }, []);

//   const validationSchema = Yup.object(
//     ProjectFields.reduce(
//       (schema, field) => {
//         schema[field.name] = field.validation;
//         return schema;
//       },
//       {
//         projectDate: Yup.string().required("تاریخ پروژه الزامی است"),
//         latitude: Yup.string().required("عرض جغرافیایی الزامی است"),
//         longitude: Yup.string().required("طول جغرافیایی الزامی است"),
//         address: Yup.string().required("آدرس پروژه الزامی است"),
//         fileNumber: Yup.string()
//           .matches(/^\d+$/, "فقط اعداد مجاز است")
//           .required("شماره پرونده الزامی است"),
//         registrationPlate: Yup.string()
//           .matches(/^\d+$/, "فقط اعداد مجاز است")
//           .required("پلاک ثبتی الزامی است"),
//         postalCode: Yup.string()
//           .matches(/^\d+$/, "فقط اعداد مجاز است")
//           .min(10, "کد پستی باید حداقل ۱۰ رقم باشد")
//           .required("کد پستی الزامی است"),
//       }
//     )
//   );

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: async (values) => {
//       const token = localStorage.getItem("authToken");
//       if (!token) {
//         alert("⛔ خطا: شما احراز هویت نشده‌اید!");
//         return;
//       }

//       try {
//         console.log("📤 ارسال درخواست به سرور...");
//         const response = await axios.post(
//           "https://amin-beton-back.chbk.app/api/projects/",
//           values,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         console.log("✅ پروژه با موفقیت ثبت شد:", response.data);
//         alert("🎉 پروژه جدید با موفقیت ثبت شد!");
//         navigate("/OrderPage");
//       } catch (error) {
//         console.error("❌ خطا در ارسال اطلاعات:", error);
//         alert("⚠️ مشکلی در ثبت پروژه به وجود آمد.");
//       }
//     },
//   });

//   useEffect(() => {
//     if (Object.keys(formik.errors).length > 0) {
//       console.log("Errors:", formik.errors);
//     }
//     if (Object.keys(formik.touched).length > 0) {
//       console.log("Touched:", formik.touched);
//     }
//   }, [formik.errors, formik.touched]);

//   return (

{
  /* <form onSubmit={formik.handleSubmit} className="space-y-6">
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
    {ProjectFields.filter(
      ({ name }) => !["description", "address"].includes(name)
    ).map(({ name, placeholder }) => (
      <div key={name} className="flex flex-col min-w-0 md:col-span-1">
        <Input
          type="text"
          name={name}
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name] || ""}
          className={`w-full text-white rounded px-4 py-2 bg-gray-700 border border-Looking-Glass
                    ${
                      formik.touched[name] && formik.errors[name]
                        ? " text-red"
                        : "border-gray-600"
                    }`}
        />
        {formik.touched[name] && formik.errors[name] && (
          <p className="mt-1 text-sm text-red">{formik.errors[name]}</p>
        )}
      </div>
    ))}

    <div className="flex flex-col col-span-1 md:col-span-2">
      <textarea
        name="address"
        placeholder="آدرس پروژه"
        {...formik.getFieldProps("address")}
        className="w-full h-24 px-4 py-2 text-white border rounded border-Looking-Glass bg-Bokara-Grey"
      />
      {formik.touched.address && formik.errors.address && (
        <p className="mt-1 text-sm text-red">{formik.errors.address}</p>
      )}
    </div>

    <div className="flex flex-col col-span-1 md:col-span-2">
      <textarea
        name="description"
        placeholder="توضیحات پروژه"
        {...formik.getFieldProps("description")}
        className="w-full h-32 px-4 py-2 text-white border rounded border-Looking-Glass bg-Bokara-Grey"
      />
      {formik.touched.description && formik.errors.description && (
        <p className="mt-1 text-sm  text-red">{formik.errors.description}</p>
      )}
    </div>


    </div>
  </div>

  <div className="flex justify-center">
    <ButtonProject
      type="submit"
      className=""
    >
      افزودن پروژه
    </ButtonProject>
  </div>
</form>; */
}
//       </div>
//     </div>
//   );
// };

// export default ProjectForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import Input from "../ui/Input";
import MapComponent from "../ui/MapComponent";
import moment from "moment-jalaali";
moment.loadPersian({ usePersianDigits: true });

const validationSchema = Yup.object({
  user: Yup.string().required("نام کاربر الزامی است"),
  title: Yup.string().required("عنوان پروژه الزامی است"),
  description: Yup.string().required("توضیحات پروژه الزامی است"),
  start_date: Yup.date().required("تاریخ شروع الزامی است"),
  end_date: Yup.date().required("تاریخ پایان الزامی است"),
  latitude: Yup.string().required("مختصات جغرافیایی الزامی است"),
  longitude: Yup.string().required("مختصات جغرافیایی الزامی است"),
  address: Yup.string().required("آدرس پروژه الزامی است"),
  postal_code: Yup.string().matches(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد"),
  registered_plate: Yup.string().required("شماره پلاک ثبت شده الزامی است"),
  case_number: Yup.string().required("شماره پرونده الزامی است"),
  supervising_engineer: Yup.string().required("نام مهندس ناظر الزامی است"),
  builder: Yup.string().required("نام سازنده الزامی است"),
  employer: Yup.string().required("نام کارفرما الزامی است"),
  type: Yup.string().required("نوع پروژه الزامی است"),
});

const ProjectAPIPage = () => {
  const [values, setValues] = useState({
    user: "",
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    latitude: "",
    longitude: "",
    address: "",
    postal_code: "",
    registered_plate: "",
    case_number: "",
    supervising_engineer: "",
    builder: "",
    employer: "",
    type: "",
  });

  const placeholders = {
    user: "نام کاربر",
    title: "عنوان پروژه",
    description: "توضیحات پروژه",
    start_date: "تاریخ شروع (YYYY-MM-DD)",
    end_date: "تاریخ پایان (YYYY-MM-DD)",
    latitude: "عرض جغرافیایی (از روی نقشه انتخاب کنید)",
    longitude: "طول جغرافیایی (از روی نقشه انتخاب کنید)",
    address: "آدرس پروژه",
    postal_code: "کد پستی (۱۰ رقمی)",
    registered_plate: "شماره پلاک ثبت شده",
    case_number: "شماره پرونده",
    supervising_engineer: "نام مهندس ناظر",
    builder: "نام سازنده",
    employer: "نام کارفرما",
    type: "نوع پروژه",
  };

  const [errors, setErrors] = useState({});
  const [responseMessage, setResponseMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // تبدیل تاریخ‌ها به شمسی هنگام بارگذاری فرم
  const formatDateToShamsi = (date) => {
    return moment(date, "YYYY-MM-DD").format("jYYYY/jMM/jDD");
  };

  const handleLocationSelect = ([lat, lng]) => {
    setValues({
      ...values,
      latitude: lat.toString(),
      longitude: lng.toString(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("⛔ خطا: شما احراز هویت نشده‌اید! به صفحه ورود هدایت می‌شوید.");
      navigate("/LoginForm");
      setIsSubmitting(false);
      return;
    }

    // تبدیل تاریخ‌های شمسی به میلادی قبل از ارسال به سرور
    const formattedValues = {
      ...values,
      start_date: moment(values.start_date, "jYYYY/jMM/jDD").format(
        "YYYY-MM-DD"
      ),
      end_date: moment(values.end_date, "jYYYY/jMM/jDD").format("YYYY-MM-DD"),
    };

    try {
      await axios.post(
        "https://amin-beton-back.chbk.app/api/projects/",
        formattedValues, // ارسال تاریخ‌های میلادی‌شده به سرور
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseMessage("✅ پروژه با موفقیت ثبت شد!");

      setTimeout(() => {
        navigate("/ProjectPage");
      }, 1500);
    } catch (error) {
      console.error("❌ خطا در ارسال اطلاعات:", error);
      setResponseMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full p-8 border rounded-lg bg-Bokara-Grey border-School-Bus">
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="flex flex-row items-center gap-2 text-3xl text-School-Bus">
            <span className="">امین</span>
            <img className="h-12" src={logo} alt="Company Logo" />
            <span className="">بتن</span>
          </div>
          <h2 className="mb-6 text-sm font-semibold text-center md:text-2xl text-School-Bus">
            ثبت پروژه جدید
          </h2>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4 justify-center">
              {Object.keys(values).map((key) => (
                <div key={key} className="relative">
                  <Input
                    type={key.includes("date") ? "date" : "text"}
                    name={key}
                    placeholder={placeholders[key]}
                    value={
                      key.includes("date")
                        ? formatDateToShamsi(values[key]) // تاریخ شمسی برای فیلدهای تاریخ
                        : values[key]
                    }
                    onChange={handleChange}
                    className="w-full text-white rounded px-4 py-2 bg-gray-700 border border-Looking-Glass"
                    disabled={key === "latitude" || key === "longitude"} // غیرقابل تغییر بودن فیلدهای مختصات
                  />
                  {errors[key] && (
                    <div className="absolute text-red-500 text-sm">
                      {errors[key]}
                    </div>
                  )}
                </div>
              ))}
              <div className="w-full flex justify-center items-center mt-4">
                <MapComponent
                  width="100%"
                  height="300px"
                  initialCoords={{
                    lat: values.latitude || 35.6892, // مقدار پیش‌فرض (مثلا تهران)
                    lng: values.longitude || 51.389,
                  }}
                  onLocationSelect={handleLocationSelect}
                />
              </div>
              <div className="flex items-center justify-center">
                <ButtonProject
                  type="submit"
                  className="py-2 mb-10 font-semibold w-56 rounded md:w-72 bg-yellow-500 text-Looking-Glass"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "در حال ارسال..." : "افزودن پروژه"}
                </ButtonProject>
              </div>
            </form>

            {responseMessage && (
              <p className="mt-4 text-center text-yellow-400">
                {responseMessage}
              </p>
            )}

            {/* نمایش نقشه و دریافت مختصات */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAPIPage;

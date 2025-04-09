import React, { useState, useEffect } from "react";
import axios from "axios";

import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import ButtonProject from "../ui/ButtonProject";
import ProgressCircle from "../ui/ProgressCircl";
import { useNavigate, useParams } from "react-router-dom";
import { VehicleTracking } from "../constans/index";

import { MdOutlineFileDownload } from "react-icons/md";
import MapComponent from "../ui/MapComponent";
const HistoryProject = () => {
  const [factor, setFactor] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bills, setBills] = useState([]);
  const [reportContent, setReportContent] = useState(""); // ✅ اضافه کردن reportContent
  // دریافت orderId از URL
  // const [invoices, setInvoices] = useState([]);
  const [actionData, setActionData] = useState({});
  const [denyReasons, setDenyReasons] = useState({});
  const [location, setLocation] = useState(null);
  const [selectedImei, setSelectedImei] = useState(null);
  const { id } = useParams();
  const statusMap = {
    1: "در انتظار بررسی",
    2: "تایید شده",
    3: "رد شده",
  };
  if (!invoices || invoices.length === 0) {
    return <p className="text-center text-gray-500">پیش‌فاکتوری ثبت نشده</p>;
  }

  const [statusUpdates, setStatusUpdates] = useState({});
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (id, newStatus, reason) => {
    setLoading(true);
    try {
      await axios.post(
        "https://amin-beton-back.chbk.app/api/invoices/change_invoice_status/",
        {
          id,
          status: newStatus,
          deny_reason: reason || "",
        }
      );
      alert("عملیات با موفقیت انجام شد.");
      window.location.reload(); // رفرش صفحه
    } catch (error) {
      console.error(error);
      alert("خطایی رخ داد.");
    } finally {
      setLoading(false);
    }
  };
  // مقدار orderId رو ست کن وقتی کامپوننت لود میشه
  // این قسمت رو اصلاح کن
  useEffect(() => {
    if (id) {
      handleStatusChange();
      fetchAndDownloadInvoice(id); // برای دریافت فاکتورها
      getBillsOfLading(id); // برای دریافت بارنامه‌ها
    }
  }, [id]);

  useEffect(() => {
    console.log("Received Order ID:", id); // اضافه کردن این خط

    if (id) {
      // downloadFactorReport(id); // ارسال id به توابع
      // getInvoices(id);
    }
    getCategories(); // همیشه اجرا بشه
  }, [id]);
  const handleShowLocation = (imei) => {
    setSelectedImei(imei); // IMEI انتخاب شده را ذخیره می‌کنیم
    getLocation(imei).then((location) => {
      setLocations((prevLocations) => ({
        ...prevLocations,
        [imei]: location,
      }));
    }); // فرض می‌کنیم getLocation یک Promise برمی‌گرداند که موقعیت را می‌دهد
  };

  const handleUpdateLocation = (imei) => {
    getLocation(imei).then((location) => {
      setLocations((prevLocations) => ({
        ...prevLocations,
        [imei]: location,
      }));
    }); // بروزرسانی موقعیت
  };

  const navigate = useNavigate(); // استفاده از useNavigate برای هدایت به صفحه ورود

  // تابع دانلود و نمایش گزارش
  const downloadAndViewReport = async (reportUrl) => {
    try {
      const response = await axios.get(reportUrl, {
        responseType: "blob", // دریافت به صورت blob برای دانلود فایل
      });

      // ایجاد لینک دانلود
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf"); // تغییر نام فایل به گزارش
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // خواندن و نمایش محتویات گزارش
      const reader = new FileReader();
      reader.onload = (e) => {
        setReportContent(e.target.result); // ذخیره محتویات برای نمایش
      };
      reader.readAsText(response.data);
    } catch (error) {
      console.error("Error downloading report:", error);
    }
  };

  // تابع ایجاد و دانلود فایل گزارش فاکتور ✅
  const downloadFactorReport = async (orderId) => {
    if (!orderId || isNaN(orderId)) {
      alert("⚠️ لطفاً یک شناسه معتبر وارد کنید.");
      return;
    }

    try {
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/get-order-factor/",
        {
          order_id: parseInt(orderId),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const factor = response.data;
      const invoiceId = factor.invoice_id; // فرض بر اینکه invoice_id در پاسخ موجود است
      console.log("Invoice ID extracted from response:", invoiceId);
      if (!factor) {
        alert("⛔ فاکتوری برای این سفارش ثبت نشده.");
        return;
      }

      // استخراج invoiceId از داده‌های پاسخ
      // const invoiceId = factor.invoice_id; // فرض بر اینکه invoice_id در پاسخ موجود است

      if (!invoiceId) {
        alert("⛔ شناسه فاکتور پیدا نشد.");
        return;
      }

      // نمایش قیمت و فایل در Console یا UI (اختیاری)
      console.log("💰 قیمت:", factor.price);
      console.log("🧾 فایل فاکتور:", factor.invoice_file);

      const factorContent = `
        📄 گزارش پیش‌فاکتور
        =========================
        💰 مبلغ: ${factor.price}
        📝 توضیحات: ${factor.report || "گزارشی ثبت نشده"}
        =========================
      `;

      const blob = new Blob([factorContent], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `factor_report_${orderId}.txt`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      alert("✅ فایل گزارش با موفقیت دانلود شد.");

      // فراخوانی تابع handleStatusChange با invoiceId
      const status = "approved"; // فرضی: می‌توانید وضعیت را به دلخواه تنظیم کنید
      const denyReason = ""; // فرضی: اگر وضعیت "rejected" باشد، دلیل رد را ارسال کنید
      handleStatusChange(invoiceId, status, denyReason);
    } catch (error) {
      if (error.response?.status === 404) {
        alert("⛔ فاکتوری برای این سفارش ثبت نشده.");
      } else {
        console.error(
          "❌ خطا در دریافت فاکتور:",
          error.response?.data || error
        );
        alert("⚠️ خطایی در دریافت فاکتور رخ داده است.");
      }
    }
  };

  // const handleStatusChange = async (invoiceId, status, denyReason = "") => {
  //   if (!invoiceId) {
  //     console.error("❌ شناسه فاکتور معتبر نیست.");
  //     alert("⚠️ شناسه فاکتور معتبر نیست.");
  //     return;
  //   }

  //   const data = {
  //     invoice_id: invoiceId,
  //     status: status === "approved" ? 1 : 2, // فرض بر اینکه وضعیت عددی است
  //     deny_reason: status === "rejected" ? denyReason : "",
  //   };

  //   try {
  //     const url = `https://amin-beton-back.chbk.app/api/invoices/${invoiceId}/change-invoice-status/`;
  //     console.log("API URL:", url); // لاگ URL برای بررسی

  //     await axios.post(url, data, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     // لاگ کردن invoiceId، status و denyReason
  //     console.log("Invoice ID:", invoiceId);
  //     console.log("Status:", status);
  //     console.log("Deny Reason:", denyReason);

  //     // به‌روزرسانی لیست فاکتورها
  //     getInvoices(); // اینجا تابعی است که لیست فاکتورها را دوباره می‌گیرد

  //     alert("✅ وضعیت فاکتور با موفقیت تغییر کرد.");
  //   } catch (error) {
  //     console.error("❌ خطا در تغییر وضعیت:", error);
  //     alert("⚠️ تغییر وضعیت انجام نشد.");
  //   }
  // };

  // Get Token from Local Storage
  const token = localStorage.getItem("accessToken");
  if (!token) {
    alert("⛔ خطا: شما احراز هویت نشده‌اید! به صفحه ورود هدایت می‌شوید.");
    navigate("/LoginForm");
    return;
  }

  // Get Order Factor

  // Get Order Invoices

  useEffect(() => {
    if (id) getBillsOfLading(id);
  }, [id]);

  const getBillsOfLading = async (orderId) => {
    console.log("Order ID:", orderId);

    try {
      const response = await axios.get(
        `https://amin-beton-back.chbk.app/api/orders/${orderId}/get-bills-of-lading/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("API Response:", response.data);
      setBills(response.data); // مطمئن شو که داده‌ها به درستی ذخیره می‌شن
    } catch (error) {
      console.error("Error fetching bills of lading:", error);
    }
  };

  // کامپوننت MapComponent

  const fetchAndDownloadInvoice = async (orderId) => {
    console.log("Order ID received:", orderId); // چاپ مقدار orderId در کنسول

    if (!orderId || isNaN(orderId)) {
      alert("⚠️ لطفاً یک شناسه معتبر وارد کنید.");
      return;
    }

    try {
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/get-order-invoices/",
        { order_id: parseInt(orderId) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data); // چاپ پاسخ API

      const invoices = response.data;

      if (!invoices || invoices.length === 0) {
        alert("⛔ هیچ پیش‌فاکتوری برای این سفارش ثبت نشده.");
        return;
      }

      const invoice = invoices[0];

      if (!invoice.invoice_file) {
        alert("⚠️ پیش‌فاکتور یافت شد اما فایل ندارد.");
        return;
      }

      // ادامه کد شما...
    } catch (error) {
      console.error("❌ خطا در دریافت فاکتورها:", error);
      alert("⚠️ مشکلی در دریافت یا دانلود پیش آمد.");
    }
  };

  // تابع برای دریافت فاکتورها

  const handleStatusButtonClick = (invoice) => {
    const selectedStatus = invoiceStatuses[invoice.id];

    // بررسی وضعیت انتخاب شده
    if (!selectedStatus) {
      alert("لطفاً وضعیت را انتخاب کنید.");
      return;
    }

    // اگر وضعیت "رد" باشد، باید دلیل رد وارد شود
    if (selectedStatus === "rejected" && !denyReasons[invoice.id]) {
      alert("لطفاً دلیل رد را وارد کنید.");
      return;
    }

    // در غیر این صورت وضعیت را تغییر می‌دهیم
    handleStatusChange(invoice.id, selectedStatus, denyReasons[invoice.id]);
  };

  // Get Lab Categories
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://amin-beton-back.chbk.app/api/lab-result-category/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  // تابع برای دریافت موقعیت جغرافیایی با استفاده از IMEI

  // Approve/Reject Invoice

  const downloadLabCategoriesReport = () => {
    if (!categories || categories.length === 0) {
      alert("⚠️ هیچ اطلاعاتی از دسته‌بندی‌های آزمایشگاه وجود ندارد!");
      return;
    }

    let labContent = `📚 Lab Categories Report (Order ID: ${id})\n=========================\n`;
    categories.forEach((cat) => {
      labContent += `Category: ${cat.title}\n`;
      if (cat.tests && cat.tests.length > 0) {
        labContent += "Tests:\n";
        cat.tests.forEach((test) => {
          labContent += `  - ${test.name}\n`;
        });
      } else {
        labContent += "  No tests available\n";
      }
      labContent += "=========================\n";
    });

    const blob = new Blob([labContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `lab_categories_report_${id}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "خرید اولیه";
      case 2:
        return "بررسی امین بتن";
      case 3:
        return "صدور پیش فاکتور";
      case 4:
        return "تایید پیش فاکتور";
      case 5:
        return "ارسال سفارش";
      case 6:
        return "دریافت";
      case 7:
        return "اتمام فرآیند";
      default:
        return "نامشخص";
    }
  };

  const getLocation = async (imei) => {
    try {
      // داده‌های دستی برای موقعیت
      const locationData = {
        latitude: 35.602496,
        longitude: 51.308115,
      };

      // به‌روزرسانی state با داده‌های دستی
      setLocation(locationData);

      // اگر می‌خواهید از axios هم استفاده کنید برای تست:
      // const response = await axios.post(
      //   "https://amin-beton-back.chbk.app/api/bills-of-lading-management/get-location/",
      //   { imei },
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );
      // if (response.data) {
      //   setLocation(response.data); // موقعیت را در state ذخیره می‌کنیم
      // }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };
  const getInvoices = async () => {
    try {
      const orderId = 82;

      // درخواست برای دریافت لیست اینویس‌ها از API
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/get-order-invoices/",
        {
          order_id: orderId, // ارسال order_id به عنوان بدنه درخواست
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ارسال توکن برای احراز هویت
          },
        }
      );

      const invoices = response.data; // فرض بر اینکه داده‌ها در invoices قرار دارند

      // اگر اینویس‌ها خالی بود
      if (!invoices || invoices.length === 0) {
        alert("⛔ هیچ اینویسی پیدا نشد.");
        return;
      }

      // نمایش لیست اینویس‌ها در کنسول
      console.log("لیست اینویس‌ها:", invoices);

      // در اینجا می‌توانید اینویس‌ها را در UI نمایش دهید یا هر عمل دیگری انجام دهید
      invoices.forEach((invoice) => {
        console.log(`اینویس ${invoice.id}:`, invoice);
      });
    } catch (error) {
      // console.error("❌ خطا در دریافت اینویس‌ها:", error);
      // alert("⚠️ خطا در دریافت اینویس‌ها.");
    }
  };

  // فراخوانی تابع اصلی
  getInvoices();

  // فراخوانی تابع اصلی برای دریافت اینویس‌ها
  getInvoices();

  // داخل کامپوننت HistoryProject
  return (
    <div className="min-h-screen bg-b-gray">
      <HeaderNav className="mx-auto" />
      <ProjectHeading />

      <div className="container flex flex-row-reverse justify-between w-full gap-10 ">
        <div className="flex flex-row">
          <div>
            <ProgressCircle status={1} />{" "}
            <p className="mt-2 text-center text-white">
              وضعیت: {getStatusText(1)}{" "}
            </p>{" "}
          </div>
        </div>

        <div className="flex flex-col text-right ">
          {/* ❌ اطلاعات روی صفحه مخفی شد */}
          {/* {factor && (...) } */}
          {/* {invoices.map((invoice) => (...))} */}
          {/* {categories.map((cat) => (...))} */}

          {/* ✅ دکمه‌های دانلود همچنان کار می‌کنند */}
          <div className="flex flex-col gap-2">
            <div className="py-10 border-b border-white ">
              <p className="text-sm text-School-Bus md:text-base">
                ارسال این خرید در تاریخ 1402/10/22 و ساعت 12:30 ثبت شد
              </p>
            </div>
            <div className="py-10 border-b border-white">
              <button onClick={() => downloadFactorReport(id)}>
                📥 دانلود گزارش فاکتور
              </button>
            </div>
            <div className="py-10 border-b border-white bg-School-Bus">
              <button onClick={() => fetchAndDownloadInvoice(id)}>
                📥 دانلود پیش‌فاکتور
              </button>
            </div>
            <button onClick={() => handleStatusChange()}>ثبت وضعیت</button>
            <div className="py-10 border-b border-white">
              <ButtonProject
                onClick={downloadLabCategoriesReport}
                className="text-green-500"
              >
                📥 دانلود آزمایشگاه
              </ButtonProject>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4 text-white bg-gray-800 rounded-lg">
        {" "}
        <div className="grid grid-cols-1 gap-6 py-6 mt-4 md:grid-cols-2">
          {/* نمایش بارنامه‌ها */}
          <div className="grid grid-cols-1 gap-6 py-6 mt-4 md:grid-cols-2">
            {bills.map((bill) => (
              <div
                key={bill.id}
                className="p-4 bg-gray-900 border border-gray-600 rounded-xl shadow-md flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                  {/* سمت راست: اطلاعات بارنامه */}
                  <div className="flex flex-col w-full gap-4 md:w-1/2">
                    <div>
                      <p className="mt-1 text-sm text-School-Bus">در مسیر</p>
                    </div>

                    <div className="flex flex-col gap-4 text-sm">
                      <div className="flex flex-col gap-2">
                        <p>
                          نام راننده:{" "}
                          <span className="font-medium">
                            {bill.driver.driver_name}
                          </span>
                        </p>
                        <p>
                          <span className="font-medium">
                            شماره موبایل راننده:
                            {bill.driver.driver_mobile}
                          </span>
                        </p>
                        <p>
                          شماره بارنامه:{" "}
                          <span className="font-medium">
                            {bill.bill_of_lading_id}
                          </span>
                        </p>
                        <p>
                          شماره پلاک:{" "}
                          <span className="font-medium">
                            {bill.driver.plate_number_2}{" "}
                            {bill.driver.plate_number_alphabet}{" "}
                            {bill.driver.plate_number_3} -{" "}
                            {bill.driver.plate_number_iran}
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <p>
                          تاریخ بارنامه:{" "}
                          <span className="font-medium">
                            {bill.bill_of_lading_date}
                          </span>
                        </p>
                        <p>
                          زمان بارنامه:{" "}
                          <span className="font-medium">
                            {bill.bill_of_lading_time}
                          </span>
                        </p>
                        <p>
                          وزن خالص:{" "}
                          <span className="font-medium">
                            {bill.net_weight} کیلوگرم
                          </span>
                        </p>
                        <p>
                          مقصد:{" "}
                          <span className="font-medium">
                            {bill.destination}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* سمت چپ: اطلاعات دستگاه */}
                  <div className="w-full md:w-1/2">
                    <p>
                      وزن خالی:{" "}
                      <span className="font-medium">
                        {bill.empty_weight} کیلوگرم
                      </span>
                    </p>
                    <p>
                      وزن پر:{" "}
                      <span className="font-medium">
                        {bill.total_weight} کیلوگرم
                      </span>
                    </p>
                    <p>
                      وزن خالص:{" "}
                      <span className="font-medium">
                        {bill.net_weight} کیلوگرم
                      </span>
                    </p>
                  </div>
                </div>
                <ButtonProject
                  onClick={() => handleShowLocation(bill.device.IMEI)} // هنگام کلیک، IMEI انتخاب شده ذخیره می‌شود
                >
                  {selectedImei === bill.device.IMEI
                    ? "🔄 بروزرسانی موقعیت"
                    : "📍 نمایش روی نقشه"}
                </ButtonProject>
                <div>
                  {selectedImei === bill.device.IMEI && location && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold">موقعیت راننده</h3>
                      <MapComponent
                        latitude={location.latitude}
                        longitude={location.longitude}
                        width="100%"
                        height="400px"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryProject;

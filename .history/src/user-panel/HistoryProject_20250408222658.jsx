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
  const [location, setLocation] = useState(null);
  const [selectedImei, setSelectedImei] = useState(null);
  const { id } = useParams();
  // مقدار orderId رو ست کن وقتی کامپوننت لود میشه
  // این قسمت رو اصلاح کن
  useEffect(() => {
    console.log("Received Order ID:", id); // اضافه کردن این خط

    if (id) {
      getFactor(id); // ارسال id به توابع
      getInvoices(id);
    }
    getCategories(); // همیشه اجرا بشه
  }, [id]);

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
  const downloadFactorReport = () => {
    if (!factor) {
      alert("⚠️ هیچ فاکتوری برای دانلود وجود ندارد!");
      return;
    }

    const factorContent = `
      📄 Factor Report
      =========================
      Order ID: ${id}
      Price: ${factor.price}
      Pre-Factor: ${factor.preFactor}
      Factor: ${factor.factor}
      Report: ${factor.report || "No report available"}
      =========================
    `;

    const blob = new Blob([factorContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `factor_report_${id}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get Token from Local Storage
  const token = localStorage.getItem("accessToken");
  if (!token) {
    alert("⛔ خطا: شما احراز هویت نشده‌اید! به صفحه ورود هدایت می‌شوید.");
    navigate("/LoginForm");
    return;
  }

  // Get Order Factor
  const getFactor = async (orderId) => {
    if (!orderId || isNaN(orderId)) {
      alert("⚠️ لطفاً یک شناسه معتبر وارد کنید.");
      return;
    }
    try {
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/get-order-factor/",
        {
          order_id: parseInt(orderId), // حالا orderId درست ارسال میشه
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data) {
        setFactor(response.data);
      }
    } catch (error) {
      console.error("Error fetching factor:", error.response?.data || error);
    }
  };

  // Get Order Invoices
  const getInvoices = async (orderId) => {
    try {
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/get-order-invoices/",
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
      if (response.data) {
        setInvoices(response.data);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };
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

  const downloadPreFactorReport = (invoice, id) => {
    console.log("Invoice ID:", invoice.id);
    console.log("Order ID inside downloadPreFactorReport:", id); // چک کردن id در اینجا

    if (!invoice || !invoice.invoice_file) {
      alert("⚠️ هیچ پیش‌فاکتوری برای دانلود وجود ندارد!");
      return;
    }

    const preFactorContent = `
      📄 Invoice Pre-Factor Report
      =========================
      Invoice ID: ${invoice.id}
      Order ID: ${id}  
      Price: ${invoice.price}
      Status: ${
        invoice.status === 1
          ? "Pending"
          : invoice.status === 2
          ? "Rejected"
          : "Approved"
      }
      Invoice File Content:
      ---------------------
      ${invoice.invoice_file}
      =========================
    `;

    const blob = new Blob([preFactorContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `invoice_report_${invoice.id}_${id}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
  const handleInvoiceStatus = async (invoiceId, status, denyReason = "") => {
    try {
      await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/approve-or-reject/",
        {
          invoice_id: invoiceId,
          status: status === "approved" ? 1 : 2, // فرض بر اینکه وضعیت عددی است
          deny_reason: denyReason,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Invoice status updated successfully.");
      getInvoices();
    } catch (error) {
      console.error("Error updating invoice status:", error);
    }
  };
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

  //لوکیششششششننننننن
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

  // داخل کامپوننت HistoryProject
  return (
    <div className="min-h-screen bg-b-gray">
      <HeaderNav className="mx-auto" />
      <ProjectHeading />

      <div className="flex flex-row-reverse  w-full gap-10  justify-between  container ">
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
          <div className="flex gap-2 flex-col">
            <div className=" border-b py-10 border-white">
              <p className="text-sm text-School-Bus md:text-base">
                ارسال این خرید در تاریخ 1402/10/22 و ساعت 12:30 ثبت شد
              </p>
            </div>
            <div className="border-b py-10 border-white">
              <ButtonProject
                onClick={downloadFactorReport}
                className="text-green-500"
              >
                📥 دانلود فاکتور
              </ButtonProject>
            </div>
            <div className="border-b py-10 border-white">
              <ButtonProject
                onClick={() => {
                  if (invoices.length === 0) {
                    alert("هیچ پیش‌فاکتوری برای دانلود وجود ندارد!");
                  } else {
                    invoices.forEach((invoice) => {
                      console.log(
                        "Invoice in downloadPreFactorReport:",
                        invoice
                      );
                      downloadPreFactorReport(invoice, id);
                    });
                  }
                }}
                className="text-green-500"
              >
                📥 دانلود پیش‌فاکتور
              </ButtonProject>
            </div>

            <div className="border-b py-10 border-white">
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
          <div
            key={vehicle.id}
            className="p-4 bg-gray-900 border border-gray-600 rounded-xl shadow-md flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02]"
          >
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
                        <h3 className="text-lg font-semibold">
                          {bill.driver.driver_mobile}
                        </h3>
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
                      <h4 className="text-sm text-white mb-2">
                        اطلاعات دستگاه
                      </h4>
                      <p>
                        IMEI:{" "}
                        <span className="font-medium">{bill.device.IMEI}</span>
                      </p>
                      <p>
                        نام دستگاه:{" "}
                        <span className="font-medium">{bill.device.name}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryProject;

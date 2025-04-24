import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import ButtonProject from "../ui/ButtonProject";
import HeaderNav from "../ui/HeadingNav";
import ProgressCircle from "../ui/ProgressCircl";
import ProjectHeading from "../ui/projectHeading";
import moment from "moment-jalaali";
import MapComponent from "../ui/MapComponent";
const getCurrentDate = () => {
  moment.locale("fa");
  const date = moment();
  return {
    fullDate: date.format("jYYYY/jMM/jDD HH:mm:ss"),
    dayName: date.format("dddd"),
  };
};
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
  // const [location, setLocation] = useState(null);
  // const [selectedImei, setSelectedImei] = useState(null);
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [selectedButton, setSelectedButton] = useState("");

  // const handleClick = (value) => {
  //   setSelectedButton(value);
  // };
  const { id } = useParams();

  // const [invoices, setInvoices] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [reviewChoice, setReviewChoice] = useState(null);
  const [denyReason, setDenyReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState(null);
  const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState({});

  // وضعیت انتخاب شده برای هر IMEI
  const [selectedImei, setSelectedImei] = useState(null);
  // const [categories, setCategories] = useState([]);
  // const [selectedButton, setSelectedButton] = useState(null); // برای ذخیره انتخاب دکمه

  // دریافت دسته‌بندی‌ها از API
  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://amin-beton-back.chbk.app/api/lab-result-category/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // توکن را از جایی دریافت کنید
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
  useEffect(() => {
    const fetchLabResults = async () => {
      try {
        // دریافت Access Token از localStorage
        const token = localStorage.getItem("accessToken");

        if (!token) {
          console.error("Access Token وجود ندارد!");
          setError("لطفاً وارد شوید یا توکن را وارد کنید.");
          setLoading(false);
          return;
        }

        const response = await axios.post(
          "https://amin-beton-back.chbk.app/api/lab-result/get-order-lab-results/",
          {
            order_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        // فیلتر کردن نتایج بر اساس selectedButton
        const filteredResults = response.data.filter((item) => {
          if (selectedButton === "14") {
            // فیلتر نتایج برای آزمایش 14 روزه
            return (
              item.created_at &&
              moment(item.created_at).isAfter(moment().subtract(14, "days"))
            );
          } else if (selectedButton === "7") {
            // فیلتر نتایج برای آزمایش 7 روزه
            return (
              item.created_at &&
              moment(item.created_at).isAfter(moment().subtract(7, "days"))
            );
          } else if (selectedButton === "3") {
            // فیلتر نتایج برای آزمایش 3 روزه
            return (
              item.created_at &&
              moment(item.created_at).isAfter(moment().subtract(3, "days"))
            );
          }
          return true; // اگر هیچ دکمه‌ای انتخاب نشده باشد، همه نتایج نمایش داده می‌شود
        });

        // گروه‌بندی بر اساس category
        const grouped = filteredResults.reduce((acc, item) => {
          const categoryTitle = item.category?.title || "بدون دسته‌بندی";
          if (!acc[categoryTitle]) {
            acc[categoryTitle] = [];
          }
          acc[categoryTitle].push({
            title: item.title,
            video: item.video,
            created_at: item.created_at,
          });
          return acc;
        }, {});

        console.log(grouped); // برای بررسی گروه‌بندی‌ها
        setGroupedResults(grouped);
      } catch (error) {
        console.error("Error fetching lab results:", error);
        setError("خطا در دریافت نتایج آزمایش");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchLabResults();
    }
  }, [id, selectedButton]); // اضافه کردن selectedButton به لیست وابستگی‌ها

  // اینجا هم id رو بذار بجای orderId

  // فراخوانی getCategories هنگام لود شدن کامپوننت
  useEffect(() => {
    getCategories();
  }, []);

  // مدیریت انتخاب دکمه‌ها
  // const handleClick = (category) => {
  //   setSelectedButton(category); // انتخاب دکمه
  // };
  // تابع برای دریافت موقعیت
  const getLocation = async (imei) => {
    try {
      const locationData = {
        latitude: 35.602496,
        longitude: 51.308115,
      };

      // ذخیره موقعیت بر اساس IMEI
      setLocations((prevLocations) => ({
        ...prevLocations,
        [imei]: locationData,
      }));
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  // تابع برای نمایش موقعیت
  const handleShowLocation = (imei) => {
    // وقتی IMEI را انتخاب می‌کنیم، آن را به عنوان IMEI انتخاب شده ذخیره می‌کنیم
    setSelectedImei(imei);

    // اگر موقعیت این IMEI قبلاً بارگذاری نشده باشد، آن را بارگذاری می‌کنیم
    if (!locations[imei]) {
      getLocation(imei);
    }
  };
  useEffect(() => {
    getInvoices();
  }, []);

  const statusMap = {
    1: "در انتظار بررسی",
    2: "تایید شده",
    3: "رد شده",
  };

  // Consolidate all API calls into a single useEffect
  useEffect(() => {
    if (id) {
      // Get invoices for the specific order ID
      getInvoices(id);
      // Get bills of lading
      getBillsOfLading(id);
      // Get categories
      getCategories();
      // Get factor data
      getFactorData(id);
    }
  }, [id]);

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

  const handleStatusChange = async (invoiceId, status, denyReason = "") => {
    if (!invoiceId) {
      console.error("❌ شناسه فاکتور معتبر نیست.");
      alert("⚠️ شناسه فاکتور معتبر نیست.");
      return;
    }

    const data = {
      invoice_id: invoiceId,
      status: status === "approved" ? 1 : 2, // فرض بر اینکه وضعیت عددی است
      deny_reason: status === "rejected" ? denyReason : "",
    };

    try {
      const url = `https://amin-beton-back.chbk.app/api/invoices/${invoiceId}/change-invoice-status/`;
      console.log("API URL:", url); // لاگ URL برای بررسی

      await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // لاگ کردن invoiceId، status و denyReason
      console.log("Invoice ID:", invoiceId);
      console.log("Status:", status);
      console.log("Deny Reason:", denyReason);

      // به‌روزرسانی لیست فاکتورها
      getInvoices(); // اینجا تابعی است که لیست فاکتورها را دوباره می‌گیرد

      alert("✅ وضعیت فاکتور با موفقیت تغییر کرد.");
    } catch (error) {
      console.error("❌ خطا در تغییر وضعیت:", error);
      alert("⚠️ تغییر وضعیت انجام نشد.");
    }
  };

  // Get Token from Local Storage
  const token = localStorage.getItem("accessToken");
  if (!token) {
    alert("⛔ خطا: شما احراز هویت نشده‌اید! به صفحه ورود هدایت می‌شوید.");
    navigate("/LoginForm");
    return;
  }

  // Get Order Factor

  // Get Order Invoices

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
  // const getCategories = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://amin-beton-back.chbk.app/api/lab-result-category/",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     if (response.data) {
  //       setCategories(response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };
  // تابع برای دریافت موقعیت جغرافیایی با استفاده از IMEI

  // Approve/Reject Invoice

  const downloadLabResultsReport = () => {
    if (!groupedResults || Object.keys(groupedResults).length === 0) {
      alert("⚠️ هیچ اطلاعاتی از نتایج آزمایشات وجود ندارد!");
      return;
    }

    let labContent = `📚 Lab Results Report (Order ID: ${id})\n=========================\n`;

    // بررسی دسته‌بندی‌ها و اضافه کردن نتایج آزمایشات
    Object.keys(groupedResults).forEach((category) => {
      labContent += `Category: ${category}\n`;

      if (groupedResults[category] && groupedResults[category].length > 0) {
        labContent += "Tests:\n";
        groupedResults[category].forEach((test) => {
          labContent += `  - Title: ${test.title}\n`;
          labContent += `    Created At: ${moment(test.created_at).format(
            "jYYYY/jMM/jDD HH:mm:ss"
          )}\n`;

          if (test.video) {
            // اگر ویدیو وجود داشت، لینک آن را اضافه می‌کنیم
            labContent += `    Video Link: ${test.video}\n`;
          } else {
            labContent += `    Video Link: No video available\n`;
          }

          labContent += "-------------------------\n";
        });
      } else {
        labContent += "  No tests available\n";
      }
      labContent += "=========================\n";
    });

    // ایجاد Blob برای ذخیره محتوای متنی
    const blob = new Blob([labContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);

    // ایجاد لینک دانلود و شروع فرآیند دانلود
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `lab_results_report_${id}.txt`);
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

  // const getLocation = async (imei) => {
  //   try {
  //     // داده‌های دستی برای موقعیت
  //     const locationData = {
  //       latitude: 35.602496,
  //       longitude: 51.308115,
  //     };

  //     // به‌روزرسانی state با داده‌های دستی
  //     setLocation(locationData);
  //   } catch (error) {
  //     console.error("Error fetching location:", error);
  //   }
  // };
  const getInvoices = async (orderId = 82) => {
    try {
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
        console.log(" هیچ پیش فاکتوری یافت نشد.");
        return;
      }

      // نمایش لیست اینویس‌ها در کنسول
      console.log("لیست پیش فاکتورها:", invoices);
      setInvoices(invoices);

      // در اینجا می‌توانید اینویس‌ها را در UI نمایش دهید یا هر عمل دیگری انجام دهید
      invoices.forEach((invoice) => {
        console.log(`پیش فاکتور ${invoice.id}:`, invoice);
      });
    } catch (error) {
      console.error("❌ خطا در دریافت پیش فاکتورها:", error);
      // alert("⚠️ خطا در دریافت پیش فاکتورها.");
    }
  };

  // Add a function to fetch factor data
  const getFactorData = async (orderId) => {
    if (!orderId || isNaN(orderId)) {
      console.log("⚠️ لطفاً یک شناسه معتبر وارد کنید.");
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

      const factorData = response.data;
      if (!factorData) {
        console.log("⛔ فاکتوری برای این سفارش ثبت نشده.");
        setFactor({ notFound: true });
        return;
      }

      console.log("Factor data:", factorData);
      setFactor(factorData);
    } catch (error) {
      console.error("❌ خطا در دریافت فاکتور:", error);
      if (error.response && error.response.status === 404) {
        setFactor({ notFound: true });
      } else {
        setFactor(null);
      }
    }
  };

  const handleInvoiceReview = async () => {
    if (!selectedInvoice || !reviewChoice) return;

    // Check if deny_reason is required and provided
    if (reviewChoice === "reject" && !denyReason.trim()) {
      alert("⚠️ لطفاً دلیل رد را وارد کنید");
      return;
    }

    setIsSubmitting(true);
    try {
      const requestData = {
        status_choice: reviewChoice === "approve" ? "accept" : "deny",
      };

      // Only add deny_reason if status is "deny"
      if (reviewChoice === "reject") {
        requestData.deny_reason = denyReason;
      }

      await axios.post(
        `https://amin-beton-back.chbk.app/api/invoices/${selectedInvoice.id}/change-invoice-status/`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh invoices after successful update
      getInvoices(id);
      setIsModalOpen(false);
      setSelectedInvoice(null);
      setReviewChoice(null);
      setDenyReason("");
    } catch (error) {
      console.error("Error updating invoice status:", error);
      alert("خطا در بروزرسانی وضعیت پیش‌فاکتور");
    } finally {
      setIsSubmitting(false);
    }
  };
  // const getLabResultsGrouped = async (orderId) => {
  //   console.log("🔍 شروع گرفتن نتایج آزمایش برای سفارش:", orderId);

  //   if (!orderId) {
  //     console.warn("⚠️ orderId تعریف نشده!");
  //     return {};
  //   }

  //   console.log("🔐 TOKEN:", token);
  //   if (!token) {
  //     console.warn("⚠️ توکن وجود ندارد!");
  //     return {};
  //   }

  //   try {
  //     const response = await axios.post(

  //       {
  //         order_id: orderId,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("✅ پاسخ از سرور دریافت شد:", response);

  //     if (response.data) {
  //       // گروه‌بندی نتایج
  //       const grouped = response.data.reduce((acc, item) => {
  //         const categoryTitle = item.category?.title || "بدون دسته‌بندی";
  //         if (!acc[categoryTitle]) {
  //           acc[categoryTitle] = [];
  //         }
  //         acc[categoryTitle].push({
  //           title: item.title,
  //           video: item.video,
  //           created_at: item.created_at,
  //         });
  //         return acc;
  //       }, {});

  //       console.log("📦 نتایج گروه‌بندی‌شده:", grouped);
  //       return grouped;
  //     } else {
  //       console.warn("⚠️ response.data وجود ندارد");
  //       return {};
  //     }
  //   } catch (error) {
  //     console.error("❌ خطا هنگام دریافت نتایج آزمایش:");
  //     if (error.response) {
  //       console.error("🧾 خطای پاسخ از سرور:", error.response.data);
  //       console.error("📊 کد وضعیت:", error.response.status);
  //     } else if (error.request) {
  //       console.error(
  //         "📡 درخواست ارسال شد ولی پاسخی دریافت نشد:",
  //         error.request
  //       );
  //     } else {
  //       console.error("🚨 خطا در تنظیم درخواست:", error.message);
  //     }
  //     return {};
  //   }
  // };
  const [groupedResults, setGroupedResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleClick = (value) => {
    setSelectedButton(value);
    // می‌توانید درخواست جدیدی ارسال کنید تا نتایج براساس این انتخاب فیلتر شود
  };

  return (
    <div className="min-h-screen bg-b-gray">
      <HeaderNav className="mx-auto" />

      <ProjectHeading
        date={currentDate.fullDate}
        dayName={currentDate.dayName}
      />
      <div className="mt-20">
        <ProgressCircle status={1} />{" "}
      </div>

      <div className="container flex flex-col px-4 text-right md:px-8">
        {/* Order Date Information */}
        <div className="py-6 border-b border-white md:py-10">
          <p className="text-xs text-center md:text-sm text-School-Bus md:text-right">
            ارسال این خرید در تاریخ 1402/10/22 و ساعت 12:30 ثبت شد
          </p>
        </div>

        {/* Order Details */}
        <div className="py-6 border-b border-white md:py-10">
          <div className="flex flex-col gap-4">
            <p className="text-sm text-center text-white md:text-lg md:text-right">
              1 متر مکعب
            </p>
            <p className="text-sm text-center text-white md:text-lg md:text-right">
              1 متر مکعب مرجوعی
            </p>
            <p className="text-sm text-center text-white md:text-lg md:text-right">
              تعداد ماشین
            </p>
          </div>
        </div>

        {/* Pre-Invoice Section */}
        <div className="py-6 border-b border-white md:py-10">
          <h2 className="mb-4 text-lg font-bold text-center text-white md:text-right">
            پیش فاکتورها
          </h2>
          {invoices.length === 0 ? (
            <div className="text-center text-red">
              پیش فاکتوری برای این سفارش ثبت نشده است!
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {invoices.map((invoice, index) => (
                <div key={invoice.id || index} className="flex flex-col gap-4">
                  <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center">
                    <div className="flex flex-col w-full gap-4 md:w-3/5">
                      <div className="flex items-center justify-center text-center md:justify-start md:text-left">
                        <p className="items-center text-sm text-center text-white md:text-lg">
                          مبلغ:
                        </p>
                        <p className="mr-2 text-sm text-white md:text-lg">
                          {invoice.price
                            ? `${invoice.price.toLocaleString()} تومان`
                            : "نامشخص"}
                        </p>
                      </div>
                      <div className="flex items-center justify-center text-center md:justify-start md:text-left">
                        <p className="text-sm text-white md:text-lg">وضعیت:</p>
                        <p
                          className={`mr-2 text-sm md:text-lg  ${
                            invoice.status === 1
                              ? "text-white"
                              : invoice.status === 2
                              ? "text-School-Bus"
                              : invoice.status === 3
                              ? "text-red"
                              : "text-white"
                          }`}
                        >
                          {invoice.status
                            ? statusMap[invoice.status]
                            : "نامشخص"}
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-2 md:items-start ">
                        {invoice.status === 3 && invoice.deny_reason && (
                          <div className="flex items-center text-center md:text-right">
                            <p className="text-sm text-white md:text-lg">
                              دلیل رد:
                            </p>
                            <p className="mr-2 text-sm md:text-lg text-red">
                              {invoice.deny_reason}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center w-full gap-4 mt-4 md:w-auto">
                      {invoice.status === 1 && (
                        <ButtonProject
                          onClick={() => {
                            setSelectedInvoice(invoice);
                            setIsModalOpen(true);
                          }}
                          className="px-4 py-2 text-white border border-white rounded-lg hover:bg-gray-700"
                        >
                          بررسی پیش‌فاکتور
                        </ButtonProject>
                      )}
                      {invoice.invoice_file && (
                        <button
                          onClick={() =>
                            window.open(invoice.invoice_file, "_blank")
                          }
                          className="flex items-center justify-center w-1/2 px-4 py-2 text-white border border-white rounded-lg md:w-full md:px-6 md:py-3 hover:bg-gray-700"
                        >
                          <span className="ml-2">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                              />
                            </svg>
                          </span>
                          دانلود پیش فاکتور
                        </button>
                      )}
                    </div>
                  </div>
                  {index < invoices.length - 1 && (
                    <div className="border-b border-gray-700"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Factor Section */}
        <div className="py-6 border-b border-white md:py-10">
          <h2 className="mb-4 text-lg font-bold text-center text-white md:text-xl md:text-right">
            فاکتور
          </h2>
          {factor ? (
            factor.notFound ? (
              <div className="text-center text-red">
                فاکتوری برای این سفارش ثبت نشده است!
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center">
                      <p className="text-sm text-white md:text-lg">مبلغ:</p>
                      <p className="mr-2 text-sm text-white md:text-lg">
                        {factor.price
                          ? `${factor.price.toLocaleString()} تومان`
                          : "نامشخص"}
                      </p>
                    </div>
                  </div>
                </div>
                {factor.factor && (
                  <button
                    onClick={() => window.open(factor.factor, "_blank")}
                    className="flex items-center px-6 py-3 text-white border border-white rounded-lg hover:bg-gray-700"
                  >
                    <span className="ml-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                      </svg>
                    </span>
                    دانلود فاکتور
                  </button>
                )}
              </div>
            )
          ) : null}
        </div>

        {/* Lab Section */}
        <div className="py-6 border-b border-white md:py-10">
          <h2 className="mb-4 text-lg font-bold text-center text-white md:text-xl md:text-right">
            آزمایشگاه
          </h2>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => downloadLabCategoriesReport()}
              className="flex items-center px-6 py-3 text-white border border-white rounded-lg hover:bg-gray-700"
            >
              <span className="ml-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </span>
              دانلود فایل
            </button>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleClick("14")}
                className={`px-4 py-2 rounded-lg md:w-auto ${
                  selectedButton === "14"
                    ? "bg-School-Bus text-white"
                    : "bg-gray-600 text-white"
                } hover:bg-opacity-90`}
              >
                آزمایش 14 روزه
              </button>
              <button
                onClick={() => handleClick("7")}
                className={`px-4 py-2 rounded-lg md:w-auto ${
                  selectedButton === "7"
                    ? "bg-School-Bus text-white"
                    : "bg-gray-600 text-white"
                } hover:bg-opacity-90`}
              >
                آزمایش 7 روزه
              </button>
              <button
                onClick={() => handleClick("3")}
                className={`px-4 py-2 rounded-lg md:w-auto ${
                  selectedButton === "3"
                    ? "bg-School-Bus text-white"
                    : "bg-gray-600 text-white"
                } hover:bg-opacity-90`}
              >
                آزمایش 3 روزه
              </button>
            </div>
          </div>
        </div>

        {/* نمایش نتایج */}
        <div>
          <h1>نتایج آزمایشات</h1>
          {loading && <p>در حال بارگذاری...</p>}
          {error && <p>{error}</p>}

          {/* نمایش گروه‌بندی‌های مختلف */}
          {Object.keys(groupedResults).map((category) => (
            <div key={category}>
              <h2>{category}</h2>
              <ul>
                {groupedResults[category].map((item, index) => (
                  <li key={index}>
                    <p>{item.title}</p>
                    <p>
                      {moment(item.created_at).format("jYYYY/jMM/jDD HH:mm:ss")}
                    </p>
                    {item.video && (
                      <a
                        href={item.video}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        مشاهده فیلم
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
                  onClick={() => handleShowLocation(bill.device.IMEI)}
                >
                  {selectedImei === bill.device.IMEI
                    ? "🔄 بروزرسانی موقعیت"
                    : "📍 نمایش روی نقشه"}
                </ButtonProject>

                <div>
                  {selectedImei === bill.device.IMEI &&
                    locations[bill.device.IMEI] && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold">موقعیت راننده</h3>
                        <MapComponent
                          latitude={locations[bill.device.IMEI].latitude}
                          longitude={locations[bill.device.IMEI].longitude}
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

      {/* Review Modal */}
      {isModalOpen && selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-gray-800 rounded-lg w-96">
            <h3 className="mb-4 text-lg font-bold text-white">
              بررسی پیش‌فاکتور
            </h3>

            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setReviewChoice("approve")}
                className={`flex-1 px-4 py-2 text-white rounded-lg ${
                  reviewChoice === "approve" ? "bg-School-Bus" : "bg-gray-600"
                }`}
              >
                تایید
              </button>
              <button
                onClick={() => setReviewChoice("reject")}
                className={`flex-1 px-4 py-2 text-white rounded-lg ${
                  reviewChoice === "reject" ? "bg-School-Bus" : "bg-gray-600"
                }`}
              >
                رد
              </button>
            </div>

            {reviewChoice === "reject" && (
              <div className="mt-4">
                <label
                  htmlFor="denyReason"
                  className="block text-sm font-medium text-white"
                >
                  دلیل رد:
                </label>
                <textarea
                  id="denyReason"
                  value={denyReason}
                  onChange={(e) => setDenyReason(e.target.value)}
                  className="w-full p-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-lg"
                  rows="3"
                />
              </div>
            )}

            <div className="mt-4 text-center">
              <button
                onClick={handleInvoiceReview}
                className="px-4 py-2 text-white rounded-lg bg-School-Bus hover:bg-opacity-90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "در حال بروزرسانی..." : "ثبت"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryProject;

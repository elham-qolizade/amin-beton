import React, { useEffect, useState } from "react";
import axios from "axios";
import ButtonProject from "../ui/ButtonProject";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment-jalaali";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
// 📌 تابع دریافت تاریخ شمسی
const getCurrentDate = () => {
  moment.locale("fa");
  const date = moment();
  return {
    fullDate: date.format("jYYYY/jMM/jDD HH:mm:ss"),
    dayName: date.format("dddd"),
  };
};

export default function OrdersPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [purchases, setPurchases] = useState([]);
  const [projectInfo, setProjectInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(getCurrentDate());
  const [modalOpen, setModalOpen] = useState(false);

  const [modalAction, setModalAction] = useState(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isPaymentsModalOpen, setIsPaymentsModalOpen] = useState(false);

  const [payments, setPayments] = useState([]);
  // دریافت اطلاعات پروژه
  const fetchProjectInfo = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `https://amin-beton-back.chbk.app/api/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setProjectInfo(response.data);
    } catch (error) {
      console.error("خطا در دریافت اطلاعات پروژه:", error);
      setError("دریافت اطلاعات پروژه با مشکل مواجه شد.");
    }
  };
  const fetchPayments = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get(
        `https://amin-beton-back.chbk.app/api/projects/${projectId}/get-project-payments/`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      console.log("Payments response:", response.data); // 🔍 بررسی ساختار

      // بررسی کنید اگر دیتا داخل شیء هست:
      const paymentsArray = Array.isArray(response.data)
        ? response.data
        : response.data.payments || [];

      setPayments(paymentsArray);
      setIsPaymentsModalOpen(true);
    } catch (error) {
      toast.error("خطا در دریافت اطلاعات گردش حساب");
    }
  };

  // دریافت لیست خریدهای پروژه
  const fetchPurchases = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/project-orders/",
        { project_id: projectId },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      // مرتب‌سازی خریدها بر اساس تاریخ delivery_datetime (تاریخ ارسال)
      const sortedPurchases = response.data.sort((a, b) => {
        return moment(b.delivery_datetime).diff(moment(a.delivery_datetime));
      });

      setPurchases(sortedPurchases);
    } catch (error) {
      console.error("خطا در دریافت خریدها:", error);
      setError("دریافت اطلاعات خریدها با مشکل مواجه شد.");
    } finally {
      setLoading(false);
    }
  };

  // 📌 تابع برای باز کردن مودال تأیید
  const openModal = (action) => {
    setModalAction(action);
    setIsActionModalOpen(true);
  };

  // 📌 تابع تأیید و اجرای عملیات
  const handleProjectAction = async () => {
    if (!projectInfo || !modalAction) return;

    const accessToken = localStorage.getItem("accessToken");
    let url = "";
    let requestData = {};
    let requestMethod = "GET"; // مقدار پیش‌فرض

    if (modalAction === "close") {
      url = `https://amin-beton-back.chbk.app/api/projects/${projectId}/`;
      requestData = { status: 2 };
      requestMethod = "PATCH";
    } else {
      url = `https://amin-beton-back.chbk.app/api/projects/${projectId}/open-project/`;
    }

    try {
      const response = await axios({
        method: requestMethod,
        url,
        headers: { Authorization: `Bearer ${accessToken}` },
        ...(requestMethod === "PATCH" && { data: requestData }),
      });

      if (response.status === 200) {
        toast.success(
          modalAction === "close"
            ? "پروژه با موفقیت بسته شد"
            : "پروژه با موفقیت باز شد"
        );
        fetchProjectInfo(); // بروزرسانی اطلاعات پروژه
      } else {
        toast.error("خطا در انجام عملیات");
      }
    } catch (error) {
      toast.error("خطا در انجام عملیات");
    } finally {
      setTimeout(() => setIsActionModalOpen(false), 500);
    }
  };

  useEffect(() => {
    fetchProjectInfo();
    fetchPurchases();
  }, [projectId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(getCurrentDate());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-Bokara-Grey">
      <ToastContainer position="top-center" />
      <div className="mx-auto">
        <HeaderNav className="bg-Armor-Wash" />

        {projectInfo ? (
          <ProjectHeading
            title={projectInfo.title}
            subtitles={[
              `آدرس پروژه: ${projectInfo.address}`,

              // `تاریخ شروع: ${projectInfo.start_date}`,
              // `تاریخ پایان: ${projectInfo.end_date}`,
            ]}
            date={currentDate.fullDate}
            dayName={currentDate.dayName}
          />
        ) : (
          <p className="text-center text-white">
            در حال دریافت اطلاعات پروژه...
          </p>
        )}

        <div className="container flex flex-col gap-6 px-4 my-10 sm:flex-row sm:justify-between">
          {/* سمت راست: تیتر و دکمه خرید */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <h2 className="text-base text-white sm:text-lg md:text-xl">
              لیست خریدهای پروژه
            </h2>

            {projectInfo?.status === 1 && (
              <ButtonProject
                onClick={() => navigate(`/SaleProject/${projectId}`)}
                className="flex items-center justify-center w-full h-10 gap-2 text-sm sm:w-auto"
              >
                <span className="text-xl">+</span>
                خرید برای این پروژه
              </ButtonProject>
            )}
          </div>

          {/* سمت چپ: دکمه‌های عملیات پروژه */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            {projectInfo && (
              <ButtonProject
                className="flex items-center justify-center w-full h-10 text-sm sm:w-36"
                onClick={() =>
                  openModal(projectInfo.status === 1 ? "close" : "open")
                }
              >
                {projectInfo.status === 1 ? "بستن پروژه" : "باز کردن پروژه"}
              </ButtonProject>
            )}

            <ButtonProject
              className="flex items-center justify-center w-full h-10 text-sm sm:w-36"
              onClick={() => navigate("/ProjectPage")}
            >
              بازگشت به صفحه پروژه‌ها
            </ButtonProject>
          </div>
        </div>
      </div>
      <div className="flex justify-center px-2 sm:px-4">
        {projectInfo && (
          <div className="w-full max-w-5xl px-4 py-4 mt-4 text-white rounded-lg shadow-md bg-Bokara-Grey sm:px-6 sm:py-6 sm:mt-6">
            <h3 className="pb-2 mb-4 text-base font-bold border-b border-gray-600 sm:text-lg">
              خلاصه مالی پروژه
            </h3>

            <p className="mt-2 text-sm sm:text-base">
              <span className="font-semibold">مجموع مبلغ پرداختی:</span>{" "}
              {projectInfo.total_paid?.toLocaleString()} ریال
            </p>

            <button
              onClick={fetchPayments}
              className="w-full px-4 py-2 mt-4 text-sm font-semibold text-black transition duration-200 bg-white rounded-md sm:w-auto hover:text-white hover:bg-School-Bus"
            >
              مشاهده گردش حساب
            </button>
          </div>
        )}
      </div>

      {loading && (
        <p className="text-center text-white">در حال دریافت اطلاعات...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col items-center px-6 py-8">
          <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {purchases.map((purchase) => {
              const payment = payments.find((p) => p.order === purchase.id); // پیدا کردن پرداخت مربوطه

              return (
                <div
                  onClick={() => navigate(`/HistoryProject/${purchase.id}`)}
                  key={purchase.id}
                  className="flex flex-col w-full gap-4 px-5 py-8 text-white transition-all duration-200 bg-gray-800 border rounded-sm cursor-pointer md:flex-row md:gap-20 hover:bg-gray-700 hover:border-School-Bus focus:border-School-Bus"
                >
                  <div className="flex flex-col flex-1 gap-2 pb-5 text-start md:text-right">
                    <h2 className="font-bold hover:text-yellow-500">
                      {purchase.order_name}
                    </h2>
                    <p className="text-sm">دیوار و ستون :{purchase.status}</p>
                    <p className="text-sm">شماره سفارش: {purchase.order_id}</p>
                    <p className="text-sm">
                      مجموع پرداختی سفارش: {purchase.total_paid_amount}
                    </p>

                    <p className="text-sm">
                      تاریخ ثبت سفارش:{" "}
                      {moment(purchase.delivery_datetime).format(
                        "jYYYY/jMM/jDD HH:mm"
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isActionModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="p-10 text-center text-black border rounded-lg border-School-Bus bg-Bokara-Grey w-96">
            <h3 className="text-2xl font-bold text-red">هشدار</h3>
            <p className="mt-3 text-lg text-School-Bus">
              {modalAction === "close"
                ? "با بستن پروژه، ثبت سفارش جدید ممکن نیست. آیا مطمئن هستید؟"
                : "آیا از باز کردن پروژه اطمینان دارید؟"}
            </p>
            <div className="flex justify-between mt-5">
              <button
                className="px-4 py-2 bg-black rounded-md text-School-Bus"
                onClick={() => setIsActionModalOpen(false)}
              >
                انصراف
              </button>
              <button
                className="px-4 py-2 text-black bg-white rounded-md"
                onClick={handleProjectAction}
              >
                تأیید
              </button>
            </div>
          </div>
        </div>
      )}
      {isPaymentsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
          <div className="w-full max-w-2xl p-6 bg-black text-white rounded-lg max-h-[80vh] overflow-hidden flex flex-col">
            <h2 className="pb-2 mb-4 text-xl font-bold text-center border-b border-gray-600">
              گردش حساب پروژه
            </h2>

            {payments.length === 0 ? (
              <p className="flex items-center justify-center flex-grow text-gray-300">
                هیچ پرداختی ثبت نشده است.
              </p>
            ) : (
              <div className="overflow-y-auto max-h-[50vh] pr-2">
                <ul className="flex flex-col gap-3">
                  {payments.map((pay) => (
                    <li
                      key={pay.id}
                      className="p-3 bg-gray-700 rounded-md shadow hover:bg-gray-600"
                    >
                      <p>عنوان: {pay.title || "ندارد"}</p>
                      <p>مبلغ: {pay.amount.toLocaleString()} ریال</p>
                      <p>توضیح: {pay.description || "ندارد"}</p>
                      <p>
                        تاریخ:{" "}
                        {moment(pay.payment_date).format("jYYYY/jMM/jDD HH:mm")}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsPaymentsModalOpen(false)}
                className="w-full px-4 py-3 text-black bg-white rounded hover:text-white hover:bg-School-Bus sm:w-auto"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

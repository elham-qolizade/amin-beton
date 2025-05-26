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
    setModalOpen(true);
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
      setTimeout(() => setModalOpen(false), 500);
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
            <h2 className="text-base text-white sm:text-lg md:text-2xl">
              لیست خریدهای پروژه
            </h2>

            {projectInfo?.status === 1 && (
              <ButtonProject
                onClick={() => navigate(`/SaleProject/${projectId}`)}
                className="flex items-center h-10 justify-center w-full gap-2 text-sm sm:w-auto"
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
      {loading && (
        <p className="text-center text-white">در حال دریافت اطلاعات...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="flex flex-col items-center px-6 py-8">
          <div className="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {purchases.map((purchase) => (
              <div
                onClick={() => navigate(`/HistoryProject/${purchase.id}`)}
                key={purchase.id}
                className="flex flex-col w-full gap-4 px-5 py-8 text-white transition-all duration-200 bg-gray-800 border rounded-sm cursor-pointer md:flex-row md:gap-20 hover:bg-gray-700 hover:bg-gray-700 hover:border-School-Bus focus:border-yellow-400"
              >
                <div className="flex flex-col flex-1 gap-2 pb-5 text-start md:text-right">
                  <h2 className="font-bold hover:text-yellow-500">
                    طبقه {purchase.name}
                  </h2>
                  <p className="text-sm">دیوار و ستون {purchase.status}</p>
                  <p className="text-sm">تاریخ ارسال {purchase.order_id}</p>
                  <p className="text-sm">
                    تاریخ ثبت سفارش {purchase.delivery_datetime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="p-10 text-center text-black rounded-lg bg-Bokara-Grey w-96">
            <h3 className="text-2xl font-bold text-red">هشدار</h3>
            <p className="mt-3 text-lg text-School-Bus">
              {modalAction === "close"
                ? "با بستن پروژه، ثبت سفارش جدید ممکن نیست. آیا مطمئن هستید؟"
                : "آیا از باز کردن پروژه اطمینان دارید؟"}
            </p>
            <div className="flex justify-between mt-5 bg-">
              <button
                className="px-4 py-2 bg-black rounded-md text-School-Bus"
                onClick={() => setModalOpen(false)}
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
    </div>
  );
}

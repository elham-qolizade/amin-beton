import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressCircle from "../ui/ProgressCircl";
import { VehicleTracking } from "../constans/index";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import ButtonProject from "../ui/ButtonProject";
import { MdOutlineFileDownload } from "react-icons/md";
import MapComponent from "../ui/MapComponent";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Importing toastify
import "react-toastify/dist/ReactToastify.css"; // Importing styles
import { useNavigate, useParams } from "react-router-dom";
export default function HistoryProject() {
  const { orderId } = useParams();
  const [selectedTest, setSelectedTest] = useState(null);
  const [labResults, setLabResults] = useState([]);
  const [orderFactor, setOrderFactor] = useState({});
  const [orderStatus, setOrderStatus] = useState(2);

  const [orderInvoices, setOrderInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState({});

  const navigate = useNavigate();

  const selectTest = (test) => setSelectedTest(test);
  const tests = ["آزمایش 3 روزه", "آزمایش ۷ روزه", "آزمایش ۱۴ روزه"];

  const accessToken = localStorage.getItem("accessToken");

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const fetchData = async () => {
    const orderId = "66";

    try {
      const [factorRes, invoicesRes, labRes, orderRes] = await Promise.all([
        axios.post(
          "https://django-ab-bridge.chbk.app/api/orders/get-order-factor/",
          { order_id: orderId },
          { headers }
        ),
        axios.post(
          "https://django-ab-bridge.chbk.app/api/orders/get-order-invoices/",
          { order_id: orderId },
          { headers }
        ),
        axios.post(
          "https://django-ab-bridge.chbk.app/api/lab-result/get-order-lab-results/",
          { order_id: orderId },
          { headers }
        ),
        axios.get(
          `https://django-ab-bridge.chbk.app/api/orders/?order_id=${orderId}`,
          { headers }
        ),
      ]);

      const orderData = orderRes.data;
      if (orderData) {
        setOrderDetails(orderData); // Set order details based on the response
        setOrderStatus(orderData.status); // Success message
      } else {
        throw new Error("اطلاعات سفارش یافت نشد");
      }

      setOrderFactor(factorRes.data);
      setOrderInvoices(invoicesRes.data);
      setLabResults(labRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Error:", err); // Log the error to see what's happening
      setError(err.message || "خطا در دریافت اطلاعات، لطفا دوباره تلاش کنید");
      toast.error(
        err.message || "خطا در دریافت اطلاعات، لطفا دوباره تلاش کنید"
      ); // Error message
      setLoading(false);
    }
  };
  const handleTestDownload = () => {
    const selectedLab = labResults.find(
      (lab) => lab.test_name === selectedTest
    );
    if (selectedLab) {
      handleDownload(selectedLab.downloadUrl, `${selectedTest}.docx`);
    } else {
      // نمایش پیام خطا با Toast
      toast.error("فایلی برای این آزمایش یافت نشد!");
    }
  };

  const handleReportDownload = () => {
    const selectedLab = labResults.find(
      (lab) => lab.test_name === selectedTest
    );
    if (selectedLab) {
      handleDownload(selectedLab.reportUrl, `${selectedTest}-report.docx`);
    } else {
      // نمایش پیام خطا با Toast
      toast.error("گزارشی برای این آزمایش یافت نشد!");
    }
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

  useEffect(() => {
    fetchData();
  }, [orderId]);

  if (loading) {
    return <p className="text-center text-white">در حال دریافت اطلاعات...</p>;
  }
  const handleDownload = (url, fileName = "file.docx") => {
    if (!url) return toast.error("لینک دانلود موجود نیست!");

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="min-h-screen bg-b-gray">
      <HeaderNav className="mx-auto" />
      <ProjectHeading
        titleClassName=" text-white font-bold"
        title={` سفارش #${id}`}
        date="1402/11/10"
      />

      <div className="container flex flex-col w-full max-w-full pt-10 ">
        <div className="flex flex-col-reverse gap-6 md:grid md:grid-cols-2 ">
          <div className="flex flex-col gap-4 text-right">
            <div className="py-2 border-b border-white">
              <p className="text-sm text-School-Bus md:text-base">
                ارسال این خرید در تاریخ 1402/10/22 و ساعت 12:30 ثبت شد
              </p>
            </div>
            <div>
              <ProgressCircle status={1} />
              <p className="mt-2 text-center text-white">
                وضعیت: {getStatusText(1)}
              </p>
            </div>
            <div className="flex flex-col gap-2 py-6 text-white border-b border-white">
              <ButtonProject
                className="flex items-center justify-around gap-4 px-1 py-1 text-white border-white w-36"
                onClick={() => {
                  if (
                    orderInvoices.length > 0 &&
                    orderInvoices[0]?.downloadUrl
                  ) {
                    // فاکتور را دانلود می‌کند
                    window.location.href = orderInvoices[0].downloadUrl;
                  } else {
                    toast.error("❌ فاکتور موجود نیست!");
                  }
                }}
              >
                دانلود پیش فاکتور
                <MdOutlineFileDownload />
              </ButtonProject>

              <span>فاکتور</span>

              <ButtonProject
                className="flex items-center justify-around gap-4 px-1 py-1 text-white border-white w-36"
                onClick={() => {
                  if (orderFactor?.factor) {
                    handleDownload(orderFactor.factor, "factor.docx");
                  } else {
                    toast.error("❌ پیش فاکتور موجود نیست!");
                  }
                }}
              >
                دانلود فاکتور
                <MdOutlineFileDownload />
              </ButtonProject>
            </div>

            <div className="text-white">
              <h4 className="py-2 text-lg md:text-xl">آزمایشگاه</h4>
              <ul className="flex flex-wrap gap-4 text-sm ">
                {tests.map((test) => (
                  <li
                    key={test}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => selectTest(test)}
                  >
                    {test}
                    <div
                      className={`w-4 h-4 flex items-center justify-center rounded-full border ${
                        selectedTest === test ? "bg-School-Bus" : "bg-white"
                      }`}
                    >
                      {selectedTest === test && (
                        <span className="w-2 h-2 bg-white rounded-full"></span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 mt-4">
                <ButtonProject
                  onClick={handleTestDownload}
                  className="flex flex-row items-center justify-around gap-8 py-1 text-white border-white w-36 md:w-36 "
                >
                  دانلود فایل
                  <MdOutlineFileDownload />
                </ButtonProject>

                <ButtonProject
                  onClick={handleReportDownload}
                  className="flex flex-row items-center justify-around gap-8 py-1 text-white border-white w-36 md:w-36 "
                >
                  دانلود گزارش
                  <MdOutlineFileDownload />
                </ButtonProject>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 text-white bg-gray-800 rounded-lg">
          <div className="grid grid-cols-1 gap-6 py-6 mt-4 md:grid-cols-2">
            {VehicleTracking.map((vehicle) => (
              <div
                key={vehicle.id}
                className="p-4 bg-gray-900 border border-gray-600 rounded-xl shadow-md flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
                  {/* سمت راست: اطلاعات ماشین */}
                  <div className="flex flex-col w-full gap-4 md:w-1/2">
                    <div>
                      <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                      <p className="mt-1 text-sm text-School-Bus">در مسیر</p>
                    </div>

                    <div className="flex flex-col gap-4 text-sm">
                      <div className="flex flex-col gap-2">
                        <p>
                          نام راننده:{" "}
                          <span className="font-medium">{vehicle.driver}</span>
                        </p>
                        <p>
                          شماره بارنامه:{" "}
                          <span className="font-medium">{vehicle.waybill}</span>
                        </p>
                        <p>
                          شماره پلاک:{" "}
                          <span className="font-medium">{vehicle.plate}</span>
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <p>
                          حجم بار:{" "}
                          <span className="font-medium">{vehicle.load}</span>
                        </p>
                        <p>
                          حجم بار تا این ماشین:{" "}
                          <span className="font-medium">
                            {vehicle.totalLoad}
                          </span>
                        </p>
                        <p>
                          ساعت خروج:{" "}
                          <span className="font-medium">
                            {vehicle.exitTime}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* سمت چپ: نقشه */}
                  <div className="relative flex justify-center w-full md:w-auto">
                    <MapComponent width="200px" height="200px" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Add ToastContainer to show toasts */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true} // برای متن فارسی
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

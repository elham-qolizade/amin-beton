import React, { useEffect, useState } from "react";
import axios from "axios";
import ButtonProject from "../ui/ButtonProject";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import { useNavigate, useParams } from "react-router-dom";

// Function to check token validity
const checkTokenValidity = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  if (!accessToken) {
    navigate("/login");
    return false;
  }

  try {
    const response = await fetch(
      "https://amin-beton-back.chbk.app/api/users/me/",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      return true;
    }

    if (response.status === 401 || response.status === 403) {
      navigate("/login");
      return false;
    }

    throw new Error("Error checking token validity");
  } catch (error) {
    console.error(error);
    navigate("/login");
    return false;
  }
};

export default function OrdersPage() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [purchases, setPurchases] = useState([]);
  const [projectInfo, setProjectInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch project info
  const fetchProjectInfo = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        `https://amin-beton-back.chbk.app/api/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setProjectInfo(response.data);
    } catch (error) {
      console.error("Error fetching project info:", error);
      setError("Failed to load project information.");
    }
  };

  // Fetch purchases list
  const fetchPurchases = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/project-orders/",
        { project_id: projectId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setPurchases(response.data);
    } catch (error) {
      console.error("Error fetching purchases:", error);
      setError("Failed to load purchases.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const validateTokenAndLoadData = async () => {
      const tokenIsValid = await checkTokenValidity();
      if (tokenIsValid) {
        fetchProjectInfo();
        fetchPurchases();
      }
    };

    validateTokenAndLoadData();
  }, [projectId]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-Bokara-Grey">
      <div className="mx-auto">
        <HeaderNav className="bg-Armor-Wash" />

        {projectInfo ? (
          <ProjectHeading
            title={` سفارش:${projectInfo.id}`}
            subtitles={[
              `آدرس پروژه: ${projectInfo.address}`,
              ` تاریخ شروع:  ${projectInfo.end_date}`,
              `تاریخ پایان: ${projectInfo.start_date}`,
            ]}
            date="1402/11/10"
          />
        ) : (
          <p className="text-center text-white">
            در حال دریافت اطلاعات پروژه...
          </p>
        )}

        <div className="container flex flex-row justify-between gap-4 px-4 my-10">
          <div className="flex flex-col gap-4 sm:flex-row md:items-center">
            <h2 className="text-lg text-white md:text-2xl">
              لیست خریدهای پروژه
            </h2>

            <div className="relative">
              <ButtonProject
                onClick={() => navigate(`/SaleProject/${projectId}`)}
                className="text-sm w-36"
              >
                <span className="text-xl">+</span> خرید برای این پروژه
              </ButtonProject>
            </div>
          </div>

          <ButtonProject
            className="self-center h-8 px-0 py-0 text-sm md:self-auto w-36"
            onClick={() => navigate("/ProjectPage")}
          >
            بازگشت به صفحه پروژه‌ها
          </ButtonProject>
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
                  className="flex flex-col w-full gap-4 px-5 py-8 text-white transition-all duration-200 bg-gray-800 border rounded-sm cursor-pointer md:flex-row md:gap-20 hover:bg-gray-700"
                >
                  <div className="flex flex-col flex-1 gap-2 pb-5 text-start md:text-right">
                    <div className="flex justify-between md:gap-10">
                      <h2 className="font-bold hover:text-yellow-500">
                        طبقه {purchase.name}
                      </h2>
                    </div>
                    <p className="text-sm">دیوار و ستون {purchase.status}</p>
                    <p className="text-sm">تاریخ ارسال {purchase.order_id}</p>
                    <p className="text-sm">
                      تاریخ ثبت سفارش {purchase.delivery_datetime}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center gap-2 text-sm md:items-center text-start">
                    <p>متراژ پمپ {purchase.concrete_area_size}</p>
                    <p>تعداد ویبراتور {purchase.concrete_pouring_height}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import ButtonProject from "../ui/ButtonProject";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomCalendar from "../ui/Calender";
import Input from "../ui/Input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jalaali from "jalaali-js";

function SaleProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [shift, setShift] = useState(1);
  const [selectedTime, setSelectedTime] = useState("08:00");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [concreteTypes, setConcreteTypes] = useState([]);
  const [concretePouringTypes, setConcretePouringTypes] = useState([]);
  const [resistanceClasses, setResistanceClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newOrder, setNewOrder] = useState({
    project: id || "",
    concrete_type: "",
    concrete_pouring_type: "",
    concrete_area_size: "",
    delivery_datetime: "",
    shift: 1,
    concrete_resistance_class: "",
    max_pipeline_length: "",
    pouring_height: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("⛔ شما احراز هویت نشده‌اید! لطفاً وارد شوید.");
        navigate("/LoginForm");
        return;
      }

      try {
        const [typesRes, pouringRes, resistanceRes] = await Promise.all([
          axios.get(
            "https://amin-beton-back.chbk.app/api/sales/concrete-list/",
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(
            "https://amin-beton-back.chbk.app/api/sales/concrete-pouring-type-list/",
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(
            "https://amin-beton-back.chbk.app/api/sales/concrete-resistance-class-list/",
            { headers: { Authorization: `Bearer ${token}` } }
          ),
        ]);

        setConcreteTypes(typesRes.data);
        setConcretePouringTypes(pouringRes.data);
        setResistanceClasses(resistanceRes.data);
      } catch (err) {
        toast.error("❌ خطا در دریافت داده‌ها!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchProjectTitle = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("⛔ شما احراز هویت نشده‌اید! لطفاً وارد شوید.");
        navigate("/LoginForm");
        return;
      }

      try {
        const response = await axios.get(
          `https://amin-beton-back.chbk.app/api/projects/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjectTitle(response.data.title);
      } catch (error) {
        toast.error("❌ خطا در دریافت اطلاعات پروژه!");
      }
    };

    fetchProjectTitle();
  }, [id, navigate]);

  // سایر useEffect ها برای زمان و تاریخ انتخابی و اعتبارسنجی همانطور که در کد اصلی نوشته شده است...

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formValid = true;
    Object.keys(newOrder).forEach((field) => {
      if (!validateField(field, newOrder[field])) {
        formValid = false;
      }
    });

    if (!formValid) {
      toast.error("⚠ لطفاً خطاهای فرم را برطرف کنید.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("⛔ شما احراز هویت نشده‌اید! لطفاً وارد شوید.");
      navigate("/LoginForm");
      return;
    }

    try {
      const response = await axios.post(
        "https://amin-beton-back.chbk.app/api/orders/",
        { ...newOrder, shift },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(`/PumpPage/${response.data.id}?reload=true`);
    } catch (error) {
      toast.error("❌ خطا در ثبت سفارش!");
    }
  };

  if (loading) {
    return (
      <div className="py-5 text-center text-white">در حال بارگذاری...</div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100 bg-Bokara-Grey">
      <h2 className="pt-10 mb-4 text-xl text-center text-white md:text-2xl">
        خرید برای
        <p>{projectTitle || "در حال دریافت عنوان پروژه..."}</p>
      </h2>
      {/* فرم کامل ادامه دارد... */}
    </div>
  );
}

export default SaleProject;

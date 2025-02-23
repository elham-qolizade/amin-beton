import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import CustomCalendar from "../ui/Calender";
import ButtonProject from "../ui/ButtonProject";
import { useNavigate } from "react-router-dom";

dayjs.locale("fa");

export function Button({ children, ...props }) {
  return (
    <button
      className="w-full p-3 text-white border border-white shadow-lg bg-Bokara-Grey rounded-2xl"
      {...props}
    >
      {children}
    </button>
  );
}
export function Select({ options, placeholder, ...props }) {
  return (
    <select
      className="w-full p-3 text-white border border-white rounded-lg bg-Bokara-Grey focus:ring-2 focus:ring-School-Bus"
      {...props}
    >
      <option value="" disabled className="bg-Bokara-Grey">
        {placeholder}
      </option>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="p-3 bg-Bokara-Grey"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default function SaleProject() {
  const { register, handleSubmit } = useForm();
  const [selectedDay, setSelectedDay] = useState(null);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log({ ...data, selectedDay });
    navigate("/SecondSalePage");
  };

  return (
    <div className="py-4 pt-6 mx-auto text-white border rounded-lg bg-Bokara-Grey border-School-Bus">
      <div className="container items-center w-2/3">
        <h2 className="pt-10 mb-8 text-xl text-center md:text-2xl">
          خرید برای پروژه "نام پروژه"
        </h2>

        <form
          className="flex flex-col items-center justify-center gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Select
            {...register("type")}
            options={[
              { value: "type1", label: "نوع ۱" },
              { value: "type2", label: "نوع ۲" },
            ]}
            placeholder="نوع بتن"
          />
          <Select
            {...register("concreteLevel")}
            options={[
              { value: "level1", label: "سطح ۱" },
              { value: "level2", label: "سطح ۲" },
            ]}
            placeholder="سطح بتن ریزی"
          />
          <Select
            {...register("priority")}
            options={[
              { value: "low", label: "کم" },
              { value: "high", label: "زیاد" },
            ]}
            placeholder="رده مقاومت"
          />
          <Select
            {...register("quantity")}
            options={[
              { value: "low", label: "کم" },
              { value: "high", label: "زیاد" },
            ]}
            placeholder="متراژ"
          />

          {/* تقویم - وسط‌چین شده */}
          <div className="flex items-center justify-center w-full mt-4">
            <CustomCalendar />
          </div>

          {/* دکمه ادامه */}

          <ButtonProject
            className="w-full py-2 mt-8 md:w-4/5 md:px-40"
            onClick={() => navigate("/SecondSalePage")}
          >
            ادامه
          </ButtonProject>
        </form>
      </div>
    </div>
  );
}

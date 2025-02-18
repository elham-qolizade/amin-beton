import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import CustomCalendar from "../ui/Calender";
import ButtonProject from "../ui/ButtonProject";
dayjs.locale("fa");
import { useNavigate } from "react-router-dom";
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
      <option value="" disabled selected>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
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
    navigate("/SecendSalePage");
  };

  return (
    <div className="max-w-3xl p-10 mx-auto text-white border bg-Bokara-Grey border-School-Bus ">
      <h2 className="mb-4 text-xl text-center">خرید برای پروژه "نام پروژه"</h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
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
      </form>
      <div className="flex flex-col items-center justify-center w-full mt-6">
        <CustomCalendar />
      </div>
      <ButtonProject
        className="w-full mt-6"
        onClick={() => navigate("/SecendSalePage")}
      >
        ادامه
      </ButtonProject>
    </div>
  );
}

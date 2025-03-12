import React from "react";
import HeaderNav from "../ui/HeadingNav";
import ProjectHeading from "../ui/projectHeading";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
export default function Contact() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-Bokara-Grey">
      <HeaderNav />
      <ProjectHeading className="py-3" />

      <div className="container px-4 py-10 mx-auto sm:px-6 lg:px-10">
        <h2 className="text-3xl font-medium text-center md:text-4xl text-School-Bus font-custom">
          تماس با ما
        </h2>

        <form className="flex flex-col gap-4 p-6 mt-10 ">
          <input
            type="text"
            id="fullName"
            name="full_name"
            placeholder="نام و نام خانوادگی"
            className="w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus "
          />
          <input
            type="text"
            id="phoneNumber"
            name="phone"
            placeholder="شماره تماس"
            className="w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus "
          />
          <input
            type="text"
            id="companyName"
            name="company"
            placeholder="نام شرکت"
            className="w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus "
          />
          <input
            type="text"
            id="address"
            name="address"
            placeholder="آدرس"
            className="w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus "
          />
          <textarea
            id="description"
            name="description"
            placeholder="توضیحات"
            className="w-full p-1 pl-4 text-white border ltr-input bg-Bokara-Grey border-l-Looking-Glass focus:outline-none focus:ring-1 focus:ring-School-Bus "
          ></textarea>

          <div className="flex gap-4">
            <Button type="submit" className="px-10">
              ارسال
            </Button>
            <Button
              onClick={() => navigate("/")}
              type="reset"
              className="px-4 py-2 rounded"
            >
              بازگشت به صفحه اصلی
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

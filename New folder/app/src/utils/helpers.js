/*eslint-disable */
import { toGregorian } from "jalaali-js";

export const formatCurrency = (value) => {
  const formattedPrice = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "IRR",
  }).format(value);

  const previewPrice = formattedPrice.split(/\s+/)[1] + " ریال";
  return previewPrice;
};

export const convertGeorgianDateToJalali = (georgianDate) => {
  return Intl.DateTimeFormat("fa-IR").format(new Date(georgianDate));
};

export const convertJalaliDateToGregorian = (date) => {
  const jalaliDate = date.split("/");
  const gregorianDate = toGregorian(
    Number(jalaliDate[0]),
    Number(jalaliDate[1]),
    Number(jalaliDate[2])
  );

  if (gregorianDate.gm < 10) gregorianDate.gm = `0${gregorianDate.gm}`;
  if (gregorianDate.gd < 10) gregorianDate.gd = `0${gregorianDate.gd}`;

  const formatedGregorianDate = `${gregorianDate.gy}-${gregorianDate.gm}-${gregorianDate.gd}`;

  return formatedGregorianDate;
};

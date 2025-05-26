import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { convertGeorgianDateToJalali } from "../../utils/helpers";
import {
  useConcreteList,
  useConcretePouringTypeList,
  useConcreteResistanceClassList,
  usePumpList,
  useSubPumpList,
  useVibratorList,
  useSubVibratorList,
} from "../../hooks/useDropdownsData";
import Spinner from "../../ui/Spinner";

const StyledObserveOrder = styled.div`
  width: 75vw;
  height: 70vh;
  overflow-y: scroll;
`;

// (بقیه styled components مثل قبل)

function ObserveOrder({ order, onUpdate }) {
  const { concreteList, isLoadingConcreteList } = useConcreteList();
  const { concretePouringTypeList, isLoadingConcretePouringTypeList } =
    useConcretePouringTypeList();
  const { concreteResistanceClassList, isLoadingConcreteResistanceClassList } =
    useConcreteResistanceClassList();
  const { isLoadingPumpList, pumpList } = usePumpList("all");
  const { vibratorList, isLoadingVibratorList } = useVibratorList("all");

  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableOrder, setEditableOrder] = useState(order);

  // وقتی prop order تغییر کرد، editableOrder هم بروز بشه
  useEffect(() => {
    setEditableOrder(order);
  }, [order]);

  const handleChange = (key, value) => {
    setEditableOrder((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSave = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token || !token.access) {
        alert("توکن یافت نشد");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      };

      const orderRes = await fetch(
        `https://amin-beton-back.chbk.app/api/orders/${editableOrder.id}/`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify(editableOrder),
        }
      );

      if (!orderRes.ok) throw new Error("ذخیره سفارش با خطا مواجه شد");

      const refreshedOrderRes = await fetch(
        `https://amin-beton-back.chbk.app/api/orders/${editableOrder.id}/`,
        { headers }
      );
      const refreshedOrder = await refreshedOrderRes.json();

      // فرض کردم savePumps و saveVibrators را خودت داری، اگر نداری باید تعریف کنی یا حذفشون کنی
      // await savePumps(headers);
      // await saveVibrators(headers);

      alert("سفارش با موفقیت ذخیره شد");

      if (typeof onUpdate === "function") {
        onUpdate(refreshedOrder);
      }

      setEditableOrder(refreshedOrder);
      setIsEditMode(false);
    } catch (err) {
      console.error("خطای کلی:", err);
      alert("خطا در ذخیره‌سازی سفارش");
    }
  };

  if (!editableOrder) {
    return <Spinner />;
  }

  return (
    <StyledObserveOrder>
      <Title>
        مشاهده سفارش <span>{editableOrder.id}#</span> از
        <span> {editableOrder.project.user_fullname} </span>
      </Title>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <button
          type="button"
          onClick={() => {
            isEditMode ? handleSave() : toggleEdit();
          }}
          style={{
            backgroundColor: "#3b82f6",
            color: "white",
            padding: "0.5rem 1.2rem",
            borderRadius: "0.8rem",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          {isEditMode ? "ذخیره تغییرات" : "ویرایش"}
        </button>
      </div>

      <Info>
        <SubTitle>اطلاعات پروژه</SubTitle>

        <InfoItem>
          نام پروژه :
          {isEditMode ? (
            <input
              value={editableOrder.project.title}
              onChange={(e) =>
                setEditableOrder({
                  ...editableOrder,
                  project: {
                    ...editableOrder.project,
                    title: e.target.value,
                  },
                })
              }
            />
          ) : (
            <span>{editableOrder.project.title}</span>
          )}
        </InfoItem>

        <InfoItem>
          نام کاربری :<span>{editableOrder.project.user_username}</span>
        </InfoItem>

        <InfoItem>
          شماره پروژه :<span>{editableOrder.project.id}</span>
        </InfoItem>

        <InfoItem>
          تاریخ آغاز پروژه :
          <span>
            {convertGeorgianDateToJalali(editableOrder.project.start_date)}
          </span>
        </InfoItem>

        <SubTitle>اطلاعات سفارش</SubTitle>

        <InfoItem>
          شماره سفارش : <span>{editableOrder.order_id}</span>
        </InfoItem>

        <InfoItem>
          متراژ بتن :
          {isEditMode ? (
            <input
              type="number"
              value={editableOrder.concrete_area_size}
              onChange={(e) =>
                handleChange("concrete_area_size", e.target.value)
              }
            />
          ) : (
            <span>{editableOrder.concrete_area_size} مترمکعب</span>
          )}
        </InfoItem>

        <InfoItem>
          ارتفاع بتن‌ریزی از محل استقرار پمپ:
          {isEditMode ? (
            <input
              type="number"
              value={editableOrder.concrete_pouring_height}
              onChange={(e) =>
                handleChange("concrete_pouring_height", e.target.value)
              }
            />
          ) : (
            <span>{editableOrder.concrete_pouring_height} متر</span>
          )}
        </InfoItem>

        <InfoItem>
          حداکثر متراژ لوله کشی:
          {isEditMode ? (
            <input
              type="number"
              value={editableOrder.piping_area_size}
              onChange={(e) => handleChange("piping_area_size", e.target.value)}
            />
          ) : (
            <span>{editableOrder.piping_area_size} متر</span>
          )}
        </InfoItem>

        <InfoItem>
          ماله پروانه :
          {isEditMode ? (
            <select
              value={editableOrder.power_trowel ? "yes" : "no"}
              onChange={(e) =>
                handleChange("power_trowel", e.target.value === "yes")
              }
            >
              <option value="yes">بله</option>
              <option value="no">خیر</option>
            </select>
          ) : (
            <span>{editableOrder.power_trowel ? "بله" : "خیر"}</span>
          )}
        </InfoItem>

        {/* ادامه بقیه فیلدها مشابه بالا ... */}

        <SubTitle>اطلاعات تکمیلی</SubTitle>

        <InfoItem className="half-row-1">
          اجرا و نظارت آبندی:
          {isEditMode ? (
            <input
              value={editableOrder.sealing_implementation}
              onChange={(e) =>
                handleChange("sealing_implementation", e.target.value)
              }
            />
          ) : (
            <span>{editableOrder.sealing_implementation}</span>
          )}
        </InfoItem>

        <InfoItem className="half-row-2">
          تاریخ و ساعت درخواستی:
          {isEditMode ? (
            <input
              value={editableOrder.delivery_datetime}
              onChange={(e) =>
                handleChange("delivery_datetime", e.target.value)
              }
            />
          ) : (
            <span>
              {convertGeorgianDateToJalali(editableOrder.delivery_datetime)} -{" "}
              {new Date(editableOrder.delivery_datetime).toLocaleTimeString(
                "fa-IR",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
            </span>
          )}
        </InfoItem>

        <InfoItem className="full-row">
          نحوه تسویه:
          {isEditMode ? (
            <input
              value={editableOrder.settlement_type}
              onChange={(e) => handleChange("settlement_type", e.target.value)}
            />
          ) : (
            <span>{editableOrder.settlement_type}</span>
          )}
        </InfoItem>

        <InfoItem className="full-row">
          توضیحات تکمیلی:
          {isEditMode ? (
            <textarea
              rows="3"
              value={editableOrder.additional_description}
              onChange={(e) =>
                handleChange("additional_description", e.target.value)
              }
            />
          ) : (
            <span>{editableOrder.additional_description}</span>
          )}
        </InfoItem>
      </Info>
    </StyledObserveOrder>
  );
}

export default ObserveOrder;

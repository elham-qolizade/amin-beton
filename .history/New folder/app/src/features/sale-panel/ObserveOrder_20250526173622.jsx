import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { convertGeorgianDateToJalali } from "../../utils/helpers";

import { getSubPumpList } from "../../services/apiUserPanel";
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
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import moment from "moment-jalaali";
moment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const StyledObserveOrder = styled.div`
  width: 75vw;
  height: 70vh;
  overflow-y: scroll;
`;
const Pumps = styled.div`
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
`;

const Pump = styled.div`
  & > * {
    margin-bottom: 1rem;
  }
`;

const Title = styled.h4`
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 4rem;

  span {
    color: var(--color-brand-600);
  }
`;

const Info = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 3rem;
  text-align: center;
  padding: 2rem;
  background-color: var(--color-grey-100);

  span {
    color: var(--color-brand-800);
  }
`;

const InfoItem = styled.div`
  padding: 1.5rem 2rem;
  border-radius: 1.5rem;
  background-color: white;
  line-height: 2;

  &.full-row {
    grid-column: 1/-1;
  }

  &.half-row-1 {
    grid-column: 1/3;
  }

  &.half-row-2 {
    grid-column: 3/5;
  }
`;
const ErrorMessage = styled.div`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 1rem 1.5rem;
  border-radius: 0.8rem;
  margin: 0.5rem auto;
  width: fit-content;
  font-weight: 600;
  border: 1px solid #fca5a5;
`;
const SubTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  grid-column: 1/-1;
  text-align: center;
`;

// (بقیه styled components مثل قبل)

function ObserveOrder({ order, onUpdate }) {
  const { concreteList, isLoadingConcreteList } = useConcreteList();
  const { concretePouringTypeList, isLoadingConcretePouringTypeList } =
    useConcretePouringTypeList();
  const { concreteResistanceClassList, isLoadingConcreteResistanceClassList } =
    useConcreteResistanceClassList();
  const [errors, setErrors] = useState({});
  const [selectedPumpIds, setSelectedPumpIds] = useState([]);
  // تبدیل تاریخ میلادی به شمسی

  const [isEditMode, setIsEditMode] = useState(false);

  const { vibratorList, isLoadingVibratorList } = useVibratorList("all");
  const [selectedVibratorId, setSelectedVibratorId] = useState(null);
  const { subVibratorList = [], isLoadingSubVibratorList } =
    useSubVibratorList(selectedVibratorId);

  const [editableOrder, setEditableOrder] = useState(order);
  // const { concreteList, isLoadingConcreteList } = useConcreteList();
  useConcretePouringTypeList();
  const { isLoadingPumpList, pumpList } = usePumpList("all");

  // const [isEditMode, setIsEditMode] = useState(false);
  // const [editableOrder, setEditableOrder] = useState(order);
  const [subPumpLists, setSubPumpLists] = useState({});
  const [pumpErrors, setPumpErrors] = useState([]);

  const [value, setValue] = useState(null);

  useEffect(() => {
    if (editableOrder?.delivery_datetime) {
      const miladiDate = new Date(editableOrder.delivery_datetime);
      const dateObj = new DateObject({
        date: miladiDate,
        calendar: persian,
        locale: persian_fa,
      });

      console.log(
        "📥 Converted DateObject:",
        dateObj.format("YYYY/MM/DD HH:mm") // حذف j
      );
      setValue(dateObj);
    }
  }, [editableOrder]);

  useEffect(() => {
    const loadSubPumps = async () => {
      const newSubPumpLists = { ...subPumpLists };

      const pumpsToLoad = editableOrder.pumps.filter(
        (p) => p.pump?.id && !newSubPumpLists[p.pump.id]
      );

      if (pumpsToLoad.length === 0) return;

      try {
        const fetchPromises = pumpsToLoad.map(async (pump) => {
          const pumpId = pump.pump.id;
          const list = await getSubPumpList(pumpId);
          newSubPumpLists[pumpId] = list;
        });

        await Promise.all(fetchPromises);
        setSubPumpLists(newSubPumpLists);
      } catch (err) {
        console.error("خطا در دریافت زیرپمپ‌ها:", err);
      }
    };

    loadSubPumps();
  }, [editableOrder.pumps]);
  const savePumps = async (headers) => {
    const body = {
      order_id: editableOrder.id,
      pumps: editableOrder.pumps.map((p) => ({
        pump: p.pump?.id,
        count: parseInt(p.count),
        sub_pump: p.sub_pump?.id || null,
      })),
    };

    const res = await fetch(
      "https://amin-beton-back.chbk.app/api/order-management/update-pump-order/",
      {
        method: "PATCH",
        headers,
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      try {
        const errorData = JSON.parse(text);
        console.error("خطا در ذخیره پمپ‌ها:", errorData);
      } catch {
        console.error("پاسخ غیرقابل تجزیه از سرور:", text);
      }
      throw new Error("ذخیره پمپ‌ها با خطا مواجه شد");
    }
  };
  const validateForm = () => {
    const errors = {};

    // بررسی نام پروژه
    if (
      !editableOrder.project?.title ||
      editableOrder.project.title.trim() === ""
    ) {
      errors.projectTitle = "نام پروژه نمی‌تواند خالی باشد.";
    }

    // بررسی متراژ بتن
    if (
      editableOrder.concrete_area_size === "" ||
      isNaN(editableOrder.concrete_area_size) ||
      Number(editableOrder.concrete_area_size) <= 0
    ) {
      errors.concrete_area_size = "متراژ بتن باید عددی مثبت باشد.";
    }

    // بررسی ارتفاع بتن‌ریزی
    if (
      editableOrder.concrete_pouring_height === "" ||
      isNaN(editableOrder.concrete_pouring_height) ||
      Number(editableOrder.concrete_pouring_height) < 0
    ) {
      errors.concrete_pouring_height =
        "ارتفاع بتن‌ریزی باید عددی غیرمنفی باشد.";
    }

    // بررسی حداکثر متراژ لوله کشی
    if (
      editableOrder.piping_area_size === "" ||
      isNaN(editableOrder.piping_area_size) ||
      Number(editableOrder.piping_area_size) < 0
    ) {
      errors.piping_area_size = "حداکثر متراژ لوله کشی باید عددی غیرمنفی باشد.";
    }

    // بررسی انتخاب نوع بتن
    if (!editableOrder.concrete_type || isNaN(editableOrder.concrete_type)) {
      errors.concrete_type = "نوع بتن باید انتخاب شود.";
    }

    // بررسی تعداد پمپ‌ها

    // بررسی تعداد ویبراتورها
    (editableOrder.vibrators || []).forEach((vib, index) => {
      if (!vib.vibrator) {
        errors[`vibrator_${index}`] = `نوع ویبراتور شماره ${
          index + 1
        } باید انتخاب شود.`;
      }
      if (vib.count === "" || isNaN(vib.count) || vib.count < 1) {
        errors[`vibrator_count_${index}`] = `تعداد ویبراتور شماره ${
          index + 1
        } باید عددی بزرگتر از صفر باشد.`;
      }
      if (vib.vibrator && !vib.sub_vibrator) {
        errors[`sub_vibrator_${index}`] = `زیرمجموعه ویبراتور شماره ${
          index + 1
        } باید انتخاب شود.`;
      }
    });

    // بررسی تاریخ و ساعت درخواستی
    if (
      !editableOrder.delivery_datetime ||
      isNaN(Date.parse(editableOrder.delivery_datetime))
    ) {
      errors.delivery_datetime = "تاریخ و ساعت درخواستی معتبر نیست.";
    }

    // بررسی توضیحات تکمیلی (مثلاً طول max 500 کاراکتر)
    if (
      editableOrder.additional_description &&
      editableOrder.additional_description.length > 500
    ) {
      errors.additional_description =
        "توضیحات تکمیلی نباید بیشتر از ۵۰۰ کاراکتر باشد.";
    }

    // ** اضافه شده: بررسی اجرای آبندی **
    if (
      !editableOrder.sealing_implementation ||
      editableOrder.sealing_implementation.trim() === ""
    ) {
      errors.sealing_implementation = "اجرای آبندی نمی‌تواند خالی باشد.";
    }

    // ** اضافه شده: بررسی نحوه تسویه **
    if (
      !editableOrder.settlement_type ||
      editableOrder.settlement_type.trim() === ""
    ) {
      errors.settlement_type = "نحوه تسویه نمی‌تواند خالی باشد.";
    }

    return errors;
  };

  const validatePumps = () => {
    const errors = [];

    editableOrder.pumps.forEach((pump, index) => {
      const error = {};
      if (!pump.pump || !pump.pump.id) {
        error.pump = "لطفاً نوع پمپ را انتخاب کنید.";
      }

      const subPumpList = subPumpLists[pump.pump?.id];
      if (
        subPumpList &&
        subPumpList.length > 0 &&
        (!pump.sub_pump || !pump.sub_pump.id)
      ) {
        error.sub_pump = "لطفاً یک زیرپمپ انتخاب کنید.";
      }

      errors.push(error);
    });

    setPumpErrors(errors);
    const hasError = errors.some((err) => Object.keys(err).length > 0);
    return !hasError;
  };
  const validateAll = () => {
    const formErrors = validateForm();
    const pumpsValid = validatePumps();

    return {
      ...formErrors,
      pumps: pumpErrors, // فرض می‌کنیم pumpErrors در state هست و بعد از validatePumps آپدیت می‌شه
      isValid: pumpsValid && Object.keys(formErrors).length === 0,
    };
  };

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
      // اعتبارسنجی فرم قبل از ارسال

      const { isValid, ...errors } = validateAll();
      if (!isValid) {
        setErrors(errors);
        alert("لطفاً خطاهای فرم را اصلاح کنید.");
        return;
      }
      setErrors({});

      const token = JSON.parse(localStorage.getItem("token"));
      if (!token || !token.access) {
        alert("توکن یافت نشد");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      };

      // PATCH کردن سفارش اصلی
      const orderRes = await fetch(
        `https://amin-beton-back.chbk.app/api/orders/${editableOrder.id}/`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify(editableOrder),
        }
      );

      if (!orderRes.ok) {
        const errorText = await orderRes.text();
        throw new Error("ذخیره سفارش با خطا مواجه شد: " + errorText);
      }

      // گرفتن سفارش به‌روز شده
      const refreshedOrderRes = await fetch(
        `https://amin-beton-back.chbk.app/api/orders/${editableOrder.id}/`,
        { headers }
      );

      if (!refreshedOrderRes.ok) {
        throw new Error("خطا در دریافت سفارش به‌روز شده");
      }

      const refreshedOrder = await refreshedOrderRes.json();

      // ذخیره پمپ‌ها و ویبراتورها (تعریف شده توسط شما)
      if (typeof savePumps === "function") {
        await savePumps(headers);
      }
      if (typeof saveVibrators === "function") {
        await saveVibrators(headers);
      }

      alert("سفارش با موفقیت ذخیره شد");

      if (typeof onUpdate === "function") {
        onUpdate(refreshedOrder);
      }

      setEditableOrder(refreshedOrder);
      setIsEditMode(false);
    } catch (err) {
      console.error("خطای کلی:", err);
      alert("خطا در ذخیره‌سازی سفارش: " + err.message);
    }
  };

  const saveVibrators = async (headers) => {
    const body = {
      order_id: editableOrder.id,
      vibrators: editableOrder.vibrators.map((v) => ({
        vibrator: v.vibrator?.id,
        sub_vibrator: v.sub_vibrator?.id || null,
        count: parseInt(v.count),
      })),
    };

    const res = await fetch(
      "https://amin-beton-back.chbk.app/api/order-management/update-vibrator-order/",
      {
        method: "PATCH",
        headers,
        body: JSON.stringify(body),
      }
    );

    const text = await res.text();
    if (!res.ok) {
      try {
        const errorData = JSON.parse(text);
        console.error("خطا در ذخیره ویبراتورها:", errorData);
      } catch {
        console.error("پاسخ غیرقابل تجزیه از سرور:", text);
      }
      throw new Error("ذخیره ویبراتورها با خطا مواجه شد");
    }
  };

  // وقتی مد ویرایش شد، اولین پمپ رو به عنوان انتخاب‌شده تنظیم کن

  useEffect(() => {
    if (isEditMode && editableOrder.vibrators?.length > 0) {
      setSelectedVibratorId(editableOrder.vibrators[0]?.vibrator?.id || null);
    } else {
      setSelectedVibratorId(null);
    }
  }, [isEditMode, editableOrder.vibrators]);

  if (isLoadingConcreteList || isLoadingPumpList || !pumpList)
    if (!editableOrder) {
      return <Spinner />;
    }

  return (
    <StyledObserveOrder>
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
                  project: { ...editableOrder.project, title: e.target.value },
                })
              }
            />
          ) : (
            <span>{order.project.title}</span>
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
            <>
              <input
                type="number"
                value={editableOrder.concrete_area_size ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  // مقدار رو هم می‌تونید به عدد تبدیل کنید اگر خواستید
                  handleChange("concrete_area_size", val);
                }}
                min={0}
                step="any"
              />
              {errors.concrete_area_size && (
                <div
                  style={{
                    color: "red",
                    marginTop: "0.3rem",
                    fontSize: "0.9rem",
                  }}
                >
                  {errors.concrete_area_size}
                </div>
              )}
            </>
          ) : (
            <span>
              {editableOrder.concrete_area_size !== undefined &&
              editableOrder.concrete_area_size !== null
                ? `${editableOrder.concrete_area_size} مترمکعب`
                : "نامشخص"}
            </span>
          )}
        </InfoItem>

        <InfoItem>
          ارتفاع بتن‌ریزی از محل استقرار پمپ:
          {isEditMode ? (
            <>
              <input
                type="number"
                value={editableOrder.concrete_pouring_height ?? ""}
                onChange={(e) =>
                  handleChange("concrete_pouring_height", e.target.value)
                }
                min={0}
                step="any"
              />
              {errors.concrete_pouring_height && (
                <div
                  style={{
                    color: "red",
                    marginTop: "0.3rem",
                    fontSize: "0.9rem",
                  }}
                >
                  {errors.concrete_pouring_height}
                </div>
              )}
            </>
          ) : (
            <span>
              {editableOrder.concrete_pouring_height !== undefined &&
              editableOrder.concrete_pouring_height !== null
                ? `${editableOrder.concrete_pouring_height} متر`
                : "نامشخص"}
            </span>
          )}
        </InfoItem>

        <InfoItem>
          حداکثر متراژ لوله کشی:
          {isEditMode ? (
            <>
              <input
                type="number"
                value={editableOrder.piping_area_size ?? ""}
                onChange={(e) =>
                  handleChange("piping_area_size", e.target.value)
                }
                min={0}
                step="any"
              />
              {errors.piping_area_size && (
                <div
                  style={{
                    color: "red",
                    marginTop: "0.3rem",
                    fontSize: "0.9rem",
                  }}
                >
                  {errors.piping_area_size}
                </div>
              )}
            </>
          ) : (
            <span>
              {editableOrder.piping_area_size !== undefined &&
              editableOrder.piping_area_size !== null
                ? `${editableOrder.piping_area_size} متر`
                : "نامشخص"}
            </span>
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

        <InfoItem>
          نوع بتن :
          {isEditMode ? (
            <select
              value={editableOrder.concrete_type}
              onChange={(e) =>
                setEditableOrder({
                  ...editableOrder,
                  concrete_type: parseInt(e.target.value),
                })
              }
            >
              {concreteList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title}
                </option>
              ))}
            </select>
          ) : (
            <span>
              {concreteList.find((c) => c.id === order.concrete_type)?.title ||
                "نامشخص"}
            </span>
          )}
        </InfoItem>
        <SubTitle>اطلاعات پمپ ها</SubTitle>
        <Pumps>
          {editableOrder.pumps.length === 0 ? (
            <Empty>پمپی در این سفارش وجود ندارد!</Empty>
          ) : (
            editableOrder.pumps.map((pump, index) => {
              const currentPumpId = pump.pump?.id;
              const localSubPumpList = subPumpLists[currentPumpId] || [];

              return (
                <Pump key={index}>
                  <InfoItem>پمپ شماره {index + 1}</InfoItem>

                  <InfoItem>
                    نوع پمپ:
                    {isEditMode ? (
                      <>
                        <select
                          value={currentPumpId || ""}
                          onChange={(e) => {
                            const selectedId = parseInt(e.target.value);
                            const selectedPumpObj = pumpList.find(
                              (p) => p.id === selectedId
                            );
                            const updated = [...editableOrder.pumps];
                            updated[index].pump = selectedPumpObj;
                            updated[index].sub_pump = null;
                            setEditableOrder((prev) => ({
                              ...prev,
                              pumps: updated,
                            }));
                          }}
                        >
                          <option value="">انتخاب کنید</option>
                          {pumpList.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.title}
                            </option>
                          ))}
                        </select>
                        {pumpErrors[index]?.pump && (
                          <div
                            style={{
                              color: "red",
                              fontSize: "12px",
                              marginTop: "4px",
                            }}
                          >
                            {pumpErrors[index].pump}
                          </div>
                        )}
                      </>
                    ) : (
                      <span>{pump.pump?.title || "نامشخص"}</span>
                    )}
                  </InfoItem>

                  <InfoItem>
                    نوع پمپ زیرمجموعه:
                    {isEditMode ? (
                      !subPumpLists[currentPumpId] ? (
                        <span>در حال بارگذاری...</span>
                      ) : (
                        <>
                          <select
                            value={pump.sub_pump?.id || ""}
                            onChange={(e) => {
                              const updated = [...editableOrder.pumps];
                              updated[index].sub_pump = localSubPumpList.find(
                                (sp) => sp.id === parseInt(e.target.value)
                              );
                              setEditableOrder((prev) => ({
                                ...prev,
                                pumps: updated,
                              }));
                            }}
                          >
                            <option value="">ندارد</option>
                            {localSubPumpList.map((sp) => (
                              <option key={sp.id} value={sp.id}>
                                {sp.title}
                              </option>
                            ))}
                          </select>
                          {pumpErrors[index]?.sub_pump && (
                            <div style={{ color: "red", fontSize: "0.875rem" }}>
                              {pumpErrors[index].sub_pump}
                            </div>
                          )}
                        </>
                      )
                    ) : (
                      <span>{pump.sub_pump?.title || "ندارد"}</span>
                    )}
                  </InfoItem>

                  <InfoItem>
                    تعداد:
                    {isEditMode ? (
                      <input
                        type="number"
                        value={pump.count}
                        onChange={(e) => {
                          const updated = [...editableOrder.pumps];
                          updated[index].count = e.target.value;
                          setEditableOrder((prev) => ({
                            ...prev,
                            pumps: updated,
                          }));
                        }}
                      />
                    ) : (
                      <span>{pump.count}</span>
                    )}
                  </InfoItem>

                  {isEditMode && (
                    <InfoItem>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...editableOrder.pumps];
                          updated.splice(index, 1);
                          setEditableOrder((prev) => ({
                            ...prev,
                            pumps: updated,
                          }));
                        }}
                      >
                        حذف پمپ
                      </button>
                    </InfoItem>
                  )}
                </Pump>
              );
            })
          )}

          {isEditMode && (
            <button
              type="button"
              onClick={() =>
                setEditableOrder((prev) => ({
                  ...prev,
                  pumps: [
                    ...prev.pumps,
                    { pump: null, sub_pump: null, count: 1 },
                  ],
                }))
              }
            >
              + افزودن پمپ جدید
            </button>
          )}
        </Pumps>
        <SubTitle>اطلاعات ویبراتورها</SubTitle>
        <Pumps>
          {editableOrder.vibrators?.length === 0 ? (
            <Empty> ویبراتوری در این سفارش وجود ندارد!</Empty>
          ) : (
            editableOrder.vibrators.map((vib, index) => {
              const currentVibId = vib.vibrator?.id;

              return (
                <Pump key={index}>
                  <InfoItem>ویبراتور شماره {index + 1}</InfoItem>

                  <InfoItem>
                    نوع ویبراتور:
                    {isEditMode ? (
                      <>
                        <select
                          value={currentVibId || ""}
                          onChange={(e) => {
                            const selectedId = parseInt(e.target.value);
                            const selectedObj =
                              vibratorList.find((v) => v.id === selectedId) ||
                              null;

                            const updated = editableOrder.vibrators.map(
                              (v, i) =>
                                i === index
                                  ? {
                                      ...v,
                                      vibrator: selectedObj,
                                      sub_vibrator: null,
                                    }
                                  : v
                            );

                            setEditableOrder((prev) => ({
                              ...prev,
                              vibrators: updated,
                            }));

                            setSelectedVibratorId(selectedId);
                          }}
                        >
                          <option value="">انتخاب کنید</option>
                          {vibratorList.map((v) => (
                            <option key={v.id} value={v.id}>
                              {v.title}
                            </option>
                          ))}
                        </select>
                        {errors[`vibrator_${index}`] && (
                          <div style={{ color: "red", marginTop: 4 }}>
                            {errors[`vibrator_${index}`]}
                          </div>
                        )}
                      </>
                    ) : (
                      <span>{vib.vibrator?.title || "نامشخص"}</span>
                    )}
                  </InfoItem>

                  <InfoItem>
                    زیرمجموعه:
                    {isEditMode ? (
                      isLoadingSubVibratorList ? (
                        <span>در حال بارگذاری...</span>
                      ) : (
                        <>
                          <select
                            value={vib.sub_vibrator?.id || ""}
                            onChange={(e) => {
                              const selectedSub =
                                subVibratorList.find(
                                  (s) => s.id === parseInt(e.target.value)
                                ) || null;

                              const updated = editableOrder.vibrators.map(
                                (v, i) =>
                                  i === index
                                    ? { ...v, sub_vibrator: selectedSub }
                                    : v
                              );

                              setEditableOrder((prev) => ({
                                ...prev,
                                vibrators: updated,
                              }));
                            }}
                          >
                            <option value="">ندارد</option>
                            {subVibratorList.map((s) => (
                              <option key={s.id} value={s.id}>
                                {s.title}
                              </option>
                            ))}
                          </select>
                          {errors[`sub_vibrator_${index}`] && (
                            <div style={{ color: "red", marginTop: 4 }}>
                              {errors[`sub_vibrator_${index}`]}
                            </div>
                          )}
                        </>
                      )
                    ) : (
                      <span>{vib.sub_vibrator?.title || "ندارد"}</span>
                    )}
                  </InfoItem>

                  <InfoItem>
                    تعداد:
                    {isEditMode ? (
                      <input
                        type="number"
                        min={1}
                        value={vib.count}
                        onChange={(e) => {
                          const value = e.target.value;
                          const count = value === "" ? "" : parseInt(value);

                          const updated = editableOrder.vibrators.map((v, i) =>
                            i === index ? { ...v, count: count } : v
                          );

                          setEditableOrder((prev) => ({
                            ...prev,
                            vibrators: updated,
                          }));
                        }}
                      />
                    ) : (
                      <span>{vib.count}</span>
                    )}
                  </InfoItem>

                  <InfoItem>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = editableOrder.vibrators.filter(
                          (_, i) => i !== index
                        );

                        setEditableOrder((prev) => ({
                          ...prev,
                          vibrators: updated,
                        }));

                        if (selectedVibratorId === currentVibId) {
                          setSelectedVibratorId(null);
                        }
                      }}
                    >
                      حذف ویبراتور
                    </button>
                  </InfoItem>
                </Pump>
              );
            })
          )}

          {isEditMode && (
            <button
              type="button"
              onClick={() =>
                setEditableOrder((prev) => ({
                  ...prev,
                  vibrators: [
                    ...(prev.vibrators || []),
                    { vibrator: null, sub_vibrator: null, count: 1 },
                  ],
                }))
              }
            >
              + افزودن ویبراتور جدید
            </button>
          )}
        </Pumps>

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
            <DatePicker
              value={value ? value.format("YYYY/MM/DD HH:mm") : ""}
              onChange={(val) => {
                setValue(val);
                const miladiDate = val?.toDate(); // برای ذخیره در سرور
                console.log("💾 ارسال به سرور (میلادی):", miladiDate);
              }}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              plugins={[<TimePicker position="bottom" hideSeconds />]}
              format="jYYYY/jMM/jDD HH:mm" // ✅ فقط به‌صورت string
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

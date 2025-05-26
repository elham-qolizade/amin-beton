/*eslint-disable */
import styled, { css } from "styled-components";

import React, { useState, useEffect } from "react";
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

  ${(props) =>
    props.className === "full-row" &&
    css`
      grid-column: 1/-1;
    `}

  ${(props) =>
    props.className === "half-row-1" &&
    css`
      grid-column: 1/3;
    `}

  ${(props) =>
    props.className === "half-row-2" &&
    css`
      grid-column: 3/5;
    `}
`;

const SubTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;

  grid-column: 1/-1;
  text-align: center;
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

const Vibrators = styled.div`
  grid-column: 1/-1;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
`;

const Vibrator = styled.div`
  & > * {
    margin-bottom: 1rem;
  }
`;

const Empty = styled.div`
  grid-column: 1/-1;
  color: var(--color-red-600);
`;

function ObserveOrder({ order }) {
  const { concreteList, isLoadingConcreteList } = useConcreteList();
  useConcretePouringTypeList();
  const [errors, setErrors] = useState({});

  const { isLoadingPumpList, pumpList } = usePumpList("all");
  // const { concreteList, isLoadingConcreteList } = useConcreteList();
  const { concretePouringTypeList, isLoadingConcretePouringTypeList } =
    useConcretePouringTypeList();
  const { concreteResistanceClassList, isLoadingConcreteResistanceClassList } =
    useConcreteResistanceClassList();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableOrder, setEditableOrder] = useState(order);
  const [selectedPumpId, setSelectedPumpId] = useState(null);
  const { vibratorList, isLoadingVibratorList } = useVibratorList("all");
  const [selectedVibratorId, setSelectedVibratorId] = useState(null);
  const { subVibratorList = [], isLoadingSubVibratorList } =
    useSubVibratorList(selectedVibratorId);
  const validateOrder = () => {
    const newErrors = {};

    if (
      !editableOrder.concrete_area_size ||
      editableOrder.concrete_area_size <= 0
    ) {
      newErrors.concrete_area_size = "متراژ بتن باید عددی مثبت باشد.";
    }

    if (
      !editableOrder.concrete_pouring_height ||
      editableOrder.concrete_pouring_height <= 0
    ) {
      newErrors.concrete_pouring_height =
        "ارتفاع بتن‌ریزی باید عددی مثبت باشد.";
    }

    if (
      !editableOrder.piping_area_size ||
      editableOrder.piping_area_size <= 0
    ) {
      newErrors.piping_area_size = "متراژ لوله کشی باید عددی مثبت باشد.";
    }

    if (editableOrder.pumps.some((p) => !p.pump || !p.count || p.count <= 0)) {
      newErrors.pumps = "اطلاعات برخی پمپ‌ها ناقص است یا تعداد نامعتبر دارد.";
    }

    if (
      editableOrder.vibrators.some(
        (v) => !v.vibrator || !v.count || v.count <= 0
      )
    ) {
      newErrors.vibrators =
        "اطلاعات برخی ویبراتورها ناقص است یا تعداد نامعتبر دارد.";
    }

    if (!editableOrder.concrete_type) {
      newErrors.concrete_type = "نوع بتن باید انتخاب شود.";
    }

    if (!editableOrder.delivery_datetime) {
      newErrors.delivery_datetime = "تاریخ و ساعت درخواستی باید وارد شود.";
    } else if (new Date(editableOrder.delivery_datetime) <= new Date()) {
      newErrors.delivery_datetime = "تاریخ باید در آینده باشد.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // از hook فقط یکبار برای selectedPumpId استفاده می‌کنیم
  const { subPumpList = [], isLoadingSubPumpList } =
    useSubPumpList(selectedPumpId);
  const toggleEdit = () => setIsEditMode((prev) => !prev);

  const handleChange = (key, value) => {
    setEditableOrder((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleSave = async () => {
    try {
      if (!validateOrder()) {
        return;
      }

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

      await savePumps(headers);
      await saveVibrators(headers);

      alert("سفارش با موفقیت ذخیره شد");
      setIsEditMode(false);
    } catch (err) {
      console.error("خطای کلی:", err);
      alert("خطا در ذخیره‌سازی سفارش");
    }
  };

  const savePumps = async (headers) => {
    const body = {
      order_id: editableOrder.id,
      pumps: editableOrder.pumps.map((p) => {
        return {
          pump: p.pump?.id,
          count: parseInt(p.count),
          sub_pump: p.sub_pump?.id || null,
        };
      }),
    };

    const res = await fetch(
      "https://amin-beton-back.chbk.app/api/order-management/update-pump-order/",
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
        console.error("خطا در ذخیره پمپ‌ها:", errorData);
      } catch {
        console.error("پاسخ غیرقابل تجزیه از سرور:", text);
      }
      throw new Error("ذخیره پمپ‌ها با خطا مواجه شد");
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
  useEffect(() => {
    if (isEditMode && editableOrder.pumps?.length > 0) {
      setSelectedPumpId(editableOrder.pumps[0].pump?.id || null);
    } else {
      setSelectedPumpId(null);
    }
  }, [isEditMode, editableOrder.pumps]);

  useEffect(() => {
    if (isEditMode && editableOrder.vibrators?.length > 0) {
      setSelectedVibratorId(editableOrder.vibrators[0]?.vibrator?.id || null);
    } else {
      setSelectedVibratorId(null);
    }
  }, [isEditMode, editableOrder.vibrators]);

  if (isLoadingConcreteList || isLoadingPumpList || !pumpList)
    if (
      isLoadingConcreteList ||
      isLoadingConcretePouringTypeList ||
      isLoadingConcreteResistanceClassList

      // isLoadingVibratorList
    )
      return <Spinner />;
  // return <Spinner />;

  return (
    <StyledObserveOrder>
      <Title>
        مشاهده سفارش <span>{order.id}#</span> از
        <span> {order.project.user_fullname} </span>
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
            console.log("clicked");
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
            <span>{order.project.title}</span>
          )}
        </InfoItem>

        <InfoItem>
          نام کاربری :<span>{order.project.user_username}</span>
        </InfoItem>

        <InfoItem>
          شماره پروژه :<span>{order.project.id}</span>
        </InfoItem>

        <InfoItem>
          تاریخ آغاز پروژه :
          <span>{convertGeorgianDateToJalali(order.project.start_date)}</span>
        </InfoItem>

        <SubTitle>اطلاعات سفارش</SubTitle>

        <InfoItem>
          شماره سفارش : <span>{order.order_id}</span>
        </InfoItem>

        <InfoItem>
          متراژ بتن:
          {isEditMode ? (
            <input
              type="number"
              min="1"
              step="0.1"
              value={editableOrder.concrete_area_size}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value) && value >= 0) {
                  handleChange("concrete_area_size", value);
                }
              }}
              placeholder="مثلاً ۲۰"
            />
          ) : (
            <span>{order.concrete_area_size} مترمکعب</span>
          )}
        </InfoItem>

        <InfoItem>
          ارتفاع بتن‌ریزی از محل استقرار پمپ:
          {isEditMode ? (
            <input
              type="number"
              min="0"
              step="0.1"
              value={editableOrder.concrete_pouring_height}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value) && value >= 0) {
                  handleChange("concrete_pouring_height", value);
                }
              }}
              placeholder="مثلاً ۵"
            />
          ) : (
            <span>{order.concrete_pouring_height} متر</span>
          )}
        </InfoItem>

        <InfoItem>
          حداکثر متراژ لوله‌کشی:
          {isEditMode ? (
            <input
              type="number"
              min="0"
              step="0.1"
              value={editableOrder.piping_area_size}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                if (!isNaN(value) && value >= 0) {
                  handleChange("piping_area_size", value);
                }
              }}
              placeholder="مثلاً ۳۰"
            />
          ) : (
            <span>{order.piping_area_size} متر</span>
          )}
        </InfoItem>

        <InfoItem>
          ماله پروانه:
          {isEditMode ? (
            <select
              value={editableOrder.power_trowel ? "yes" : "no"}
              onChange={(e) => {
                const isYes = e.target.value === "yes";
                handleChange("power_trowel", isYes);
              }}
            >
              <option value="yes">بله</option>
              <option value="no">خیر</option>
            </select>
          ) : (
            <span>{order.power_trowel ? "بله" : "خیر"}</span>
          )}
        </InfoItem>

        <InfoItem>
          نوع بتن:
          {isEditMode ? (
            <select
              value={editableOrder.concrete_type || ""}
              onChange={(e) => {
                const selectedId = parseInt(e.target.value, 10);
                if (!isNaN(selectedId)) {
                  handleChange("concrete_type", selectedId);
                }
              }}
            >
              <option value="" disabled>
                انتخاب کنید
              </option>
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

        {/* باقی فیلدها مانند بالا ویرایش‌پذیر می‌شن */}
        <SubTitle>اطلاعات پمپ ها</SubTitle>
        <Pumps>
          {editableOrder.pumps.length === 0 ? (
            <Empty>پمپی در این سفارش وجود ندارد!</Empty>
          ) : (
            editableOrder.pumps.map((pump, index) => {
              const currentPumpId = pump.pump?.id ?? "";

              const handlePumpChange = (e) => {
                const selectedId = parseInt(e.target.value, 10);
                const selectedPumpObj =
                  pumpList.find((p) => p.id === selectedId) || null;

                const updated = [...editableOrder.pumps];
                updated[index] = {
                  ...updated[index],
                  pump: selectedPumpObj,
                  sub_pump: null,
                };
                setEditableOrder((prev) => ({ ...prev, pumps: updated }));
                setSelectedPumpId(selectedId);
              };

              const handleSubPumpChange = (e) => {
                const selectedId = parseInt(e.target.value, 10);
                const selectedSubPump =
                  subPumpList.find((sp) => sp.id === selectedId) || null;

                const updated = [...editableOrder.pumps];
                updated[index] = {
                  ...updated[index],
                  sub_pump: selectedSubPump,
                };
                setEditableOrder((prev) => ({ ...prev, pumps: updated }));
              };

              const handleCountChange = (e) => {
                const val = e.target.value;
                const updated = [...editableOrder.pumps];
                updated[index] = { ...updated[index], count: val };
                setEditableOrder((prev) => ({ ...prev, pumps: updated }));
              };

              const handleRemovePump = () => {
                const updated = [...editableOrder.pumps];
                updated.splice(index, 1);
                setEditableOrder((prev) => ({ ...prev, pumps: updated }));

                if (selectedPumpId === currentPumpId) {
                  setSelectedPumpId(null);
                }
              };

              return (
                <Pump key={index}>
                  <InfoItem>پمپ شماره {index + 1}</InfoItem>

                  <InfoItem>
                    نوع پمپ:
                    {isEditMode ? (
                      <select value={currentPumpId} onChange={handlePumpChange}>
                        <option value="">انتخاب کنید</option>
                        {pumpList.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.title}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span>{pump.pump?.title || "نامشخص"}</span>
                    )}
                  </InfoItem>

                  <InfoItem>
                    نوع پمپ زیرمجموعه:
                    {isEditMode ? (
                      isLoadingSubPumpList ? (
                        <span>در حال بارگذاری...</span>
                      ) : (
                        <select
                          value={pump.sub_pump?.id || ""}
                          onChange={handleSubPumpChange}
                        >
                          <option value="">ندارد</option>
                          {subPumpList.map((sp) => (
                            <option key={sp.id} value={sp.id}>
                              {sp.title}
                            </option>
                          ))}
                        </select>
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
                        onChange={handleCountChange}
                      />
                    ) : (
                      <span>{pump.count}</span>
                    )}
                  </InfoItem>

                  {isEditMode && (
                    <InfoItem>
                      <button type="button" onClick={handleRemovePump}>
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
          {(editableOrder.vibrators?.length ?? 0) === 0 ? (
            <Empty>ویبراتوری در این سفارش وجود ندارد!</Empty>
          ) : (
            editableOrder.vibrators.map((vib, index) => {
              const currentVibId = vib.vibrator?.id ?? "";

              const handleVibChange = (e) => {
                const selectedId = parseInt(e.target.value, 10);
                const selectedObj =
                  vibratorList.find((v) => v.id === selectedId) || null;

                const updated = [...editableOrder.vibrators];
                updated[index] = {
                  ...updated[index],
                  vibrator: selectedObj,
                  sub_vibrator: null,
                };
                setEditableOrder((prev) => ({ ...prev, vibrators: updated }));
                setSelectedVibratorId(selectedId);
              };

              const handleSubVibChange = (e) => {
                const selectedId = parseInt(e.target.value, 10);
                const selectedSubVib =
                  subVibratorList.find((s) => s.id === selectedId) || null;

                const updated = [...editableOrder.vibrators];
                updated[index] = {
                  ...updated[index],
                  sub_vibrator: selectedSubVib,
                };
                setEditableOrder((prev) => ({ ...prev, vibrators: updated }));
              };

              const handleVibCountChange = (e) => {
                const val = e.target.value;
                const updated = [...editableOrder.vibrators];
                updated[index] = { ...updated[index], count: val };
                setEditableOrder((prev) => ({ ...prev, vibrators: updated }));
              };

              const handleRemoveVib = () => {
                const updated = [...editableOrder.vibrators];
                updated.splice(index, 1);
                setEditableOrder((prev) => ({ ...prev, vibrators: updated }));
                if (selectedVibratorId === currentVibId) {
                  setSelectedVibratorId(null);
                }
              };

              return (
                <Pump key={index}>
                  <InfoItem>ویبراتور شماره {index + 1}</InfoItem>

                  <InfoItem>
                    نوع ویبراتور:
                    {isEditMode ? (
                      <select value={currentVibId} onChange={handleVibChange}>
                        <option value="">انتخاب کنید</option>
                        {vibratorList.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.title}
                          </option>
                        ))}
                      </select>
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
                        <select
                          value={vib.sub_vibrator?.id || ""}
                          onChange={handleSubVibChange}
                        >
                          <option value="">ندارد</option>
                          {subVibratorList.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.title}
                            </option>
                          ))}
                        </select>
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
                        value={vib.count}
                        onChange={handleVibCountChange}
                      />
                    ) : (
                      <span>{vib.count}</span>
                    )}
                  </InfoItem>

                  {isEditMode && (
                    <InfoItem>
                      <button type="button" onClick={handleRemoveVib}>
                        حذف ویبراتور
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

        <SubTitle>اطلاعات تکمیلی</SubTitle>
        <InfoItem className="half-row-1">
          اجرا و نظارت آبندی:
          {isEditMode ? (
            <input
              type="text"
              value={editableOrder.sealing_implementation}
              onChange={(e) =>
                handleChange("sealing_implementation", e.target.value)
              }
            />
          ) : (
            <span>{order.sealing_implementation || "نامشخص"}</span>
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
              {convertGeorgianDateToJalali(order.delivery_datetime)} -{" "}
              {new Date(order.delivery_datetime).toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </InfoItem>

        <InfoItem className="full-row">
          نحوه تسویه:
          {isEditMode ? (
            <input
              type="text"
              value={editableOrder.settlement_type}
              onChange={(e) => handleChange("settlement_type", e.target.value)}
            />
          ) : (
            <span>{order.settlement_type || "نامشخص"}</span>
          )}
        </InfoItem>

        <InfoItem className="full-row">
          توضیحات تکمیلی:
          {isEditMode ? (
            <textarea
              rows={3}
              value={editableOrder.additional_description}
              onChange={(e) =>
                handleChange("additional_description", e.target.value)
              }
            />
          ) : (
            <span>{order.additional_description || "ندارد"}</span>
          )}
        </InfoItem>
      </Info>
    </StyledObserveOrder>
  );
}

export default ObserveOrder;

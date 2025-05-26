/*eslint-disable */
import styled, { css } from "styled-components";
import React, { useState } from "react";
import { useMemo } from "react";

import { convertGeorgianDateToJalali } from "../../utils/helpers";
import {
  useConcreteList,
  useConcretePouringTypeList,
  useConcreteResistanceClassList,
  usePumpList,
  useVibratorList,
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
  const { concretePouringTypeList, isLoadingConcretePouringTypeList } =
    useConcretePouringTypeList();
  const { concreteResistanceClassList, isLoadingConcreteResistanceClassList } =
    useConcreteResistanceClassList();

  const [isEditMode, setIsEditMode] = useState(false);
  const [editableOrder, setEditableOrder] = useState(order);

  const { isLoadingPumpList, pumpList } = usePumpList("all");
  const { vibratorList: flatList = [] } = useVibratorList("all");

  const vibratorList = useMemo(() => {
    if (!flatList || flatList.length === 0) return [];

    const parents = flatList.filter((v) => !v.parent);
    return parents.map((parent) => ({
      ...parent,
      sub_vibrators: flatList.filter((v) => v.parent === parent.id),
    }));
  }, [flatList]);

  // تغییر ویبراتور یا زیر ویبراتور یا تعداد ویبراتور
  const handleVibratorChange = (index, key, value) => {
    setEditableOrder((prev) => {
      const updatedVibrators = [...prev.vibrators];
      updatedVibrators[index] = {
        ...updatedVibrators[index],
        [key]: value,
        ...(key === "vibrator" ? { sub_vibrator: null } : {}), // ریست زیرمجموعه در صورت تغییر ویبراتور اصلی
      };
      return { ...prev, vibrators: updatedVibrators };
    });
  };

  const toggleEdit = () => setIsEditMode((prev) => !prev);

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

      console.log("در حال ذخیره سفارش...");
      const orderRes = await fetch(
        `https://amin-beton-back.chbk.app/api/orders/${editableOrder.id}/`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify(editableOrder),
        }
      );

      if (!orderRes.ok) throw new Error("ذخیره سفارش با خطا مواجه شد");

      console.log("سفارش ذخیره شد.");

      try {
        console.log("در حال ذخیره پمپ...");
        await savePumps(headers);
        console.log("پمپ ذخیره شد.");
      } catch (e) {
        console.error("خطا در ذخیره پمپ:", e);
      }

      try {
        console.log("در حال ذخیره ویبراتور...");
        await saveVibrators(headers);
        console.log("ویبراتور ذخیره شد.");
      } catch (e) {
        console.error("خطا در ذخیره ویبراتور:", e);
      }

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
        const base = {
          pump: p.pump?.id,
          count: parseInt(p.count),
        };

        if (p.sub_pump?.id) {
          base.sub_pump = p.sub_pump.id;
        } else {
          base.sub_pump_id = null;
        }

        return base;
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
    console.log("API response:", res.data); // یا فقط res
    setFlatList(res.data);
    if (!res.ok) {
      try {
        const errorData = JSON.parse(text);
        console.error("خطا در ذخیره ویبراتورها:", errorData);
      } catch {
        console.error("پاسخ غیرقابل تجزیه:", text);
      }
      throw new Error("ذخیره ویبراتورها با خطا مواجه شد");
    }
  };

  console.log("کل vibratorList:", vibratorList);
  if (
    isLoadingConcreteList ||
    isLoadingConcretePouringTypeList ||
    isLoadingConcreteResistanceClassList ||
    isLoadingPumpList
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
            <span>{order.concrete_area_size} مترمکعب</span>
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
            <span>{order.concrete_pouring_height} متر</span>
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
            <span>{order.piping_area_size} متر</span>
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
            <span>{order.power_trowel ? "بله" : "خیر"}</span>
          )}
        </InfoItem>

        <InfoItem>
          نوع بتن :
          {isEditMode ? (
            <select
              value={editableOrder.concrete_type}
              onChange={(e) =>
                handleChange("concrete_type", parseInt(e.target.value))
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
        <SubTitle>اطلاعات پمپ ها</SubTitle>
        <Pumps>
          {editableOrder.pumps.length === 0 ? (
            <Empty> پمپی در این سفارش وجود ندارد!</Empty>
          ) : (
            editableOrder.pumps.map((pump, index) => {
              const selectedPump = pumpList.find((p) => p.id === pump.pump?.id);
              const subPumpOptions = selectedPump?.sub_pumps || [];

              return (
                <Pump key={index}>
                  <InfoItem>پمپ شماره {index + 1}</InfoItem>

                  <InfoItem>
                    نوع پمپ:
                    {isEditMode ? (
                      <select
                        value={pump.pump?.id || ""}
                        onChange={(e) => {
                          const updated = [...editableOrder.pumps];
                          const selectedId = parseInt(e.target.value);
                          updated[index].sub_pump = isNaN(selectedId)
                            ? null
                            : subPumpOptions.find((sp) => sp.id === selectedId);
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
                    ) : (
                      <span>{pump.pump?.title || "نامشخص"}</span>
                    )}
                  </InfoItem>

                  <InfoItem>
                    نوع پمپ زیرمجموعه:
                    {isEditMode ? (
                      <select
                        value={pump.sub_pump?.id || ""}
                        onChange={(e) => {
                          const updated = [...editableOrder.pumps];
                          updated[index].sub_pump = subPumpOptions.find(
                            (sp) => sp.id === parseInt(e.target.value)
                          );
                          setEditableOrder((prev) => ({
                            ...prev,
                            pumps: updated,
                          }));
                        }}
                      >
                        <option value="">ندارد</option>
                        {subPumpOptions.map((sp) => (
                          <option key={sp.id} value={sp.id}>
                            {sp.title}
                          </option>
                        ))}
                      </select>
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
        {editableOrder.vibrators.map((v, index) => {
          const mainVibratorId = v.vibrator;
          const subVibratorId = v.sub_vibrator;

          const mainVibrator = flatList.find(
            (item) => item.id === mainVibratorId
          );
          const subVibrators = flatList.filter(
            (item) => item.parent === mainVibratorId
          );
          const selectedSub = subVibrators.find(
            (item) => item.id === subVibratorId
          );

          return (
            <div key={index}>
              <InfoItem>
                نوع ویبراتور:
                {isEditMode ? (
                  <select
                    value={v.vibrator || ""}
                    onChange={(e) => {
                      const updated = [...editableOrder.vibrators];
                      updated[index].vibrator = parseInt(e.target.value);
                      updated[index].sub_vibrator = null;
                      setEditableOrder((prev) => ({
                        ...prev,
                        vibrators: updated,
                      }));
                    }}
                  >
                    <option value="">انتخاب کنید</option>
                    {flatList
                      .filter((v) => v.parent === null)
                      .map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.title}
                        </option>
                      ))}
                  </select>
                ) : (
                  <span>{mainVibrator?.title || "نامشخص"}</span>
                )}
              </InfoItem>

              <InfoItem>
                ویبراتور زیرمجموعه:
                {isEditMode ? (
                  <select
                    value={v.sub_vibrator || ""}
                    onChange={(e) => {
                      const updated = [...editableOrder.vibrators];
                      updated[index].sub_vibrator =
                        parseInt(e.target.value) || null;
                      setEditableOrder((prev) => ({
                        ...prev,
                        vibrators: updated,
                      }));
                    }}
                    disabled={!mainVibratorId}
                  >
                    <option value="">ندارد</option>
                    {subVibrators.map((sv) => (
                      <option key={sv.id} value={sv.id}>
                        {sv.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span>{selectedSub?.title || "ندارد"}</span>
                )}
              </InfoItem>

              <InfoItem>
                تعداد:
                {isEditMode ? (
                  <input
                    type="number"
                    value={v.count}
                    min={1}
                    onChange={(e) => {
                      const updated = [...editableOrder.vibrators];
                      updated[index].count = parseInt(e.target.value, 10) || 1;
                      setEditableOrder((prev) => ({
                        ...prev,
                        vibrators: updated,
                      }));
                    }}
                  />
                ) : (
                  <span>{v.count}</span>
                )}
              </InfoItem>

              {isEditMode && (
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...editableOrder.vibrators];
                    updated.splice(index, 1);
                    setEditableOrder((prev) => ({
                      ...prev,
                      vibrators: updated,
                    }));
                  }}
                >
                  حذف
                </button>
              )}
            </div>
          );
        })}

        {/* باقی فیلدها مانند بالا ویرایش‌پذیر می‌شن */}

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
            <span>{order.sealing_implementation}</span>
          )}
        </InfoItem>

        <InfoItem className="half-row-2">
          تاریخ و ساعت درخواستی:
          {isEditMode ? (
            <input
              type="datetime-local"
              value={editableOrder.delivery_datetime}
              onChange={(e) =>
                handleChange("delivery_datetime", e.target.value)
              }
            />
          ) : (
            <span>
              {convertGeorgianDateToJalali(
                order.delivery_datetime.split(" ")[0]
              )}{" "}
              - {order.delivery_datetime.split(" ")[1]}
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
            <span>{order.settlement_type}</span>
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
            <span>{order.additional_description}</span>
          )}
        </InfoItem>
      </Info>
    </StyledObserveOrder>
  );
}

export default ObserveOrder;

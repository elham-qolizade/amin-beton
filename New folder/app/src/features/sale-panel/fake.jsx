/* eslint-disable */
import styled, { css } from "styled-components";
import React, { useState, useEffect } from "react";

<DatePicker
  value={value}
  onChange={setValue}
  calendar={persian}
  locale={persian_fa}
  calendarPosition="bottom-right"
  plugins={[<TimePicker position="bottom" hideSeconds />]}
  format="YYYY/MM/DD HH:mm"
/>;

import { convertGeorgianDateToJalali } from "../../utils/helpers";
import {
  useConcreteList,
  useConcretePouringTypeList,
  usePumpList,
} from "../../hooks/useDropdownsData";

import { getSubPumpList } from "../../services/apiUserPanel"; // مسیر دقیق رو با توجه به پروژه‌ت اصلاح کن

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

const Empty = styled.div`
  grid-column: 1/-1;
  color: var(--color-red-600);
`;

function ObserveOrder({ order }) {
  const { concreteList, isLoadingConcreteList } = useConcreteList();
  useConcretePouringTypeList();
  const { isLoadingPumpList, pumpList } = usePumpList("all");

  const [isEditMode, setIsEditMode] = useState(false);
  const [editableOrder, setEditableOrder] = useState(order);
  const [subPumpLists, setSubPumpLists] = useState({});
  const [pumpErrors, setPumpErrors] = useState([]);

  const toggleEdit = () => setIsEditMode((prev) => !prev);

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

  const handleSave = async () => {
    if (!validatePumps()) return;

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

    if (!res.ok) {
      const text = await res.text();
      try {
        const errorData = JSON.parse(text);
        console.error("خطا در ذخیره ویبراتورها:", errorData);
      } catch {
        console.error("پاسخ غیرقابل تجزیه از سرور:", text);
      }
      throw new Error("ذخیره ویبراتورها با خطا مواجه شد");
    }
  };

  if (isLoadingConcreteList || isLoadingPumpList || !pumpList)
    return <Spinner />;

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
          onClick={() => (isEditMode ? handleSave() : toggleEdit())}
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
                          <ErrorMessage>{pumpErrors[index].pump}</ErrorMessage>
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
                            <ErrorMessage>
                              {pumpErrors[index].sub_pump}
                            </ErrorMessage>
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
      </Info>
    </StyledObserveOrder>
  );
}

export default ObserveOrder;

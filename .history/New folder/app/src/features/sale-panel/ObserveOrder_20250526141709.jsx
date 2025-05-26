/* eslint-disable */
import styled, { css } from "styled-components";
import React, { useState, useEffect } from "react";

import { convertGeorgianDateToJalali } from "../../utils/helpers";
import {
  useConcreteList,
  useConcretePouringTypeList,
  usePumpList,
} from "../../hooks/useDropdownsData";

import { getSubPumpList } from "../../services/apiUserPanel"; // مسیر دقیق رو با توجه به پروژه‌ت اصلاح کن

import Spinner from "../../ui/Spinner";

/* eslint-disable */

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
  margin: 1rem auto;
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
  const [errorMsg, setErrorMsg] = useState("");

  const toggleEdit = () => setIsEditMode((prev) => !prev);

  useEffect(() => {
    const loadSubPumps = async () => {
      const newSubPumpLists = { ...subPumpLists };

      for (let pump of editableOrder.pumps) {
        const pumpId = pump.pump?.id;
        if (pumpId && !newSubPumpLists[pumpId]) {
          try {
            const list = await getSubPumpList(pumpId);
            newSubPumpLists[pumpId] = list;
          } catch (err) {
            console.error("خطا در دریافت زیرپمپ‌ها:", err);
          }
        }
      }

      setSubPumpLists(newSubPumpLists);
    };

    loadSubPumps();
  }, [editableOrder.pumps]);

  const validatePumps = () => {
    for (let pump of editableOrder.pumps) {
      if (!pump.pump || !pump.pump.id) {
        setErrorMsg("لطفاً برای همه پمپ‌ها، نوع پمپ را انتخاب کنید.");
        return false;
      }

      const subPumpList = subPumpLists[pump.pump.id];
      if (
        subPumpList &&
        subPumpList.length > 0 &&
        (!pump.sub_pump || !pump.sub_pump.id)
      ) {
        setErrorMsg(
          `لطفاً زیرپمپ مربوط به پمپ "${pump.pump.title}" را انتخاب کنید.`
        );
        return false;
      }
    }

    setErrorMsg("");
    return true;
  };

  const handleSave = async () => {
    if (!validatePumps()) return;

    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token || !token.access) {
        setErrorMsg("توکن یافت نشد");
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

      setErrorMsg("");
      alert("سفارش با موفقیت ذخیره شد");
      setIsEditMode(false);
    } catch (err) {
      console.error("خطای کلی:", err);
      setErrorMsg("خطا در ذخیره‌سازی سفارش");
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
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      <Title>
        مشاهده سفارش <span>{order.id}#</span> از
        <span> {order.project.user_fullname} </span>
      </Title>
      ...
    </StyledObserveOrder>
  );
}

export default ObserveOrder;

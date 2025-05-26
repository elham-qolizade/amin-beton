/* eslint-disable */
import styled, { css } from "styled-components";
import React, { useState, useEffect } from "react";

import { convertGeorgianDateToJalali } from "../../utils/helpers";
import {
  useConcreteList,
  useConcretePouringTypeList,
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
      grid-column: 1 / -1;
    `}
  ${(props) =>
    props.className === "half-row-1" &&
    css`
      grid-column: 1 / 3;
    `}
  ${(props) =>
    props.className === "half-row-2" &&
    css`
      grid-column: 3 / 5;
    `}
`;

const SubTitle = styled.h4`
  font-size: 1.5rem;
  font-weight: 600;
  grid-column: 1 / -1;
  text-align: center;
`;

const Pumps = styled.div`
  grid-column: 1 / -1;
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
  grid-column: 1 / -1;
  color: var(--color-red-600);
`;

function ObserveOrder({ order }) {
  const { concreteList, isLoadingConcreteList } = useConcreteList();
  useConcretePouringTypeList();
  const { isLoadingPumpList, pumpList } = usePumpList("all");
  const { vibratorList, isLoadingVibratorList } = useVibratorList("all");

  const [isEditMode, setIsEditMode] = useState(false);
  const [editableOrder, setEditableOrder] = useState(order);
  const [selectedPumpId, setSelectedPumpId] = useState(null);
  const [selectedVibratorId, setSelectedVibratorId] = useState(null);

  const { subPumpList = [], isLoadingSubPumpList } =
    useSubPumpList(selectedPumpId);
  const { subVibratorList = [], isLoadingSubVibratorList } =
    useSubVibratorList(selectedVibratorId);

  useEffect(() => {
    if (isEditMode && editableOrder.pumps.length > 0) {
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

  const toggleEdit = () => setIsEditMode((prev) => !prev);

  const handleSave = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (!token?.access) return alert("توکن یافت نشد");

      const headers = {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "application/json",
      };

      const res = await fetch(
        `https://amin-beton-back.chbk.app/api/orders/${editableOrder.id}/`,
        {
          method: "PATCH",
          headers,
          body: JSON.stringify(editableOrder),
        }
      );

      if (!res.ok) throw new Error("ذخیره سفارش با خطا مواجه شد");

      await savePumps(headers);
      await saveVibrators(headers);
      alert("سفارش با موفقیت ذخیره شد");
      setIsEditMode(false);
    } catch (err) {
      console.error(err);
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

    if (!res.ok) throw new Error("ذخیره پمپ‌ها با خطا مواجه شد");
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

    if (!res.ok) throw new Error("ذخیره ویبراتورها با خطا مواجه شد");
  };

  if (isLoadingConcreteList || isLoadingPumpList || !pumpList)
    return <Spinner />;

  return (
    <OrderView
      {...{
        order,
        editableOrder,
        setEditableOrder,
        isEditMode,
        toggleEdit,
        handleSave,
        pumpList,
        subPumpList,
        isLoadingSubPumpList,
        vibratorList,
        subVibratorList,
        isLoadingSubVibratorList,
        selectedPumpId,
        setSelectedPumpId,
        selectedVibratorId,
        setSelectedVibratorId,
      }}
    />
  );
}

export default ObserveOrder;

// برای ساده‌تر کردن کد بالا می‌توان بخش مربوط به رندرینگ را در کامپوننت جدا مثل <OrderView /> قرار داد.

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
export default function PumpInputs({ isEditMode, editableOrder, setEditableOrder }) {
  const pumpList = usePumpList();
  const vibratorList = useVibratorList();

  const [selectedPumpIds, setSelectedPumpIds] = useState([]);
  const [selectedVibratorIds, setSelectedVibratorIds] = useState([]);

  useEffect(() => {
    if (isEditMode) {
      setSelectedPumpIds(editableOrder.pumps.map(p => p.pump?.id || null));
      setSelectedVibratorIds(editableOrder.vibrators.map(v => v.vibrator?.id || null));
    } else {
      setSelectedPumpIds([]);
      setSelectedVibratorIds([]);
    }
  }, [isEditMode, editableOrder]);

  const handlePumpChange = (index, selectedId) => {
    const selectedPumpObj = pumpList.find(p => p.id === selectedId);

    const updatedPumps = [...editableOrder.pumps];
    updatedPumps[index].pump = selectedPumpObj;
    updatedPumps[index].sub_pump = null;

    setEditableOrder(prev => ({ ...prev, pumps: updatedPumps }));

    const updatedIds = [...selectedPumpIds];
    updatedIds[index] = selectedId;
    setSelectedPumpIds(updatedIds);
  };

  const handleSubPumpChange = (index, selectedSubPumpId) => {
    const updated = [...editableOrder.pumps];
    updated[index].sub_pump = selectedSubPumpId;
    setEditableOrder(prev => ({ ...prev, pumps: updated }));
  };

  const handleVibratorChange = (index, selectedId) => {
    const selectedVibratorObj = vibratorList.find(v => v.id === selectedId);

    const updatedVibrators = [...editableOrder.vibrators];
    updatedVibrators[index].vibrator = selectedVibratorObj;
    updatedVibrators[index].sub_vibrator = null;

    setEditableOrder(prev => ({ ...prev, vibrators: updatedVibrators }));

    const updatedIds = [...selectedVibratorIds];
    updatedIds[index] = selectedId;
    setSelectedVibratorIds(updatedIds);
  };

  const handleSubVibratorChange = (index, selectedSubVibratorId) => {
    const updated = [...editableOrder.vibrators];
    updated[index].sub_vibrator = selectedSubVibratorId;
    setEditableOrder(prev => ({ ...prev, vibrators: updated }));
  };

  return (
    <>
      {editableOrder.pumps.map((pumpItem, index) => {
        const subPumpList = useSubPumpList(selectedPumpIds[index]);

        return (
          <div key={index} className="flex items-center gap-4 mb-2">
            <select
              value={pumpItem.pump?.id || ""}
              onChange={(e) => handlePumpChange(index, parseInt(e.target.value))}
            >
              <option value="">انتخاب پمپ</option>
              {pumpList.map((pump) => (
                <option key={pump.id} value={pump.id}>
                  {pump.name}
                </option>
              ))}
            </select>

            <select
              value={pumpItem.sub_pump || ""}
              onChange={(e) => handleSubPumpChange(index, parseInt(e.target.value))}
            >
              <option value="">انتخاب زیرمجموعه پمپ</option>
              {subPumpList.map((subPump) => (
                <option key={subPump.id} value={subPump.id}>
                  {subPump.name}
                </option>
              ))}
            </select>
          </div>
        );
      })}

      {editableOrder.vibrators.map((vibratorItem, index) => {
        const subVibratorList = useSubVibratorList(selectedVibratorIds[index]);

        return (
          <div key={index} className="flex items-center gap-4 mb-2">
            <select
              value={vibratorItem.vibrator?.id || ""}
              onChange={(e) => handleVibratorChange(index, parseInt(e.target.value))}
            >
              <option value="">انتخاب ویبراتور</option>
              {vibratorList.map((vib) => (
                <option key={vib.id} value={vib.id}>
                  {vib.name}
                </option>
              ))}
            </select>

            <select
              value={vibratorItem.sub_vibrator || ""}
              onChange={(e) => handleSubVibratorChange(index, parseInt(e.target.value))}
            >
              <option value="">انتخاب زیرمجموعه ویبراتور</option>
              {subVibratorList.map((subVib) => (
                <option key={subVib.id} value={subVib.id}>
                  {subVib.name}
                </option>
              ))}
            </select>
          </div>
        );
      })}
    </>
  );
}

export default ObserveOrder;

import React, { useState, useEffect } from "react";
import { usePumpList, useSubPumpList } from "../../../hooks/usePumpList";
import {
  useVibratorList,
  useSubVibratorList,
} from "../../../hooks/useVibratorList";

export default function PumpInputs({
  isEditMode,
  editableOrder,
  setEditableOrder,
}) {
  const pumpList = usePumpList();
  const vibratorList = useVibratorList();

  const [selectedPumpIds, setSelectedPumpIds] = useState([]);
  const [selectedVibratorIds, setSelectedVibratorIds] = useState([]);

  useEffect(() => {
    if (isEditMode) {
      setSelectedPumpIds(editableOrder.pumps.map((p) => p.pump?.id || null));
      setSelectedVibratorIds(
        editableOrder.vibrators.map((v) => v.vibrator?.id || null)
      );
    } else {
      setSelectedPumpIds([]);
      setSelectedVibratorIds([]);
    }
  }, [isEditMode, editableOrder]);

  const handlePumpChange = (index, selectedId) => {
    const selectedPumpObj = pumpList.find((p) => p.id === selectedId);

    const updatedPumps = [...editableOrder.pumps];
    updatedPumps[index].pump = selectedPumpObj;
    updatedPumps[index].sub_pump = null;

    setEditableOrder((prev) => ({ ...prev, pumps: updatedPumps }));

    const updatedIds = [...selectedPumpIds];
    updatedIds[index] = selectedId;
    setSelectedPumpIds(updatedIds);
  };

  const handleSubPumpChange = (index, selectedSubPumpId) => {
    const updated = [...editableOrder.pumps];
    updated[index].sub_pump = selectedSubPumpId;
    setEditableOrder((prev) => ({ ...prev, pumps: updated }));
  };

  const handleVibratorChange = (index, selectedId) => {
    const selectedVibratorObj = vibratorList.find((v) => v.id === selectedId);

    const updatedVibrators = [...editableOrder.vibrators];
    updatedVibrators[index].vibrator = selectedVibratorObj;
    updatedVibrators[index].sub_vibrator = null;

    setEditableOrder((prev) => ({ ...prev, vibrators: updatedVibrators }));

    const updatedIds = [...selectedVibratorIds];
    updatedIds[index] = selectedId;
    setSelectedVibratorIds(updatedIds);
  };

  const handleSubVibratorChange = (index, selectedSubVibratorId) => {
    const updated = [...editableOrder.vibrators];
    updated[index].sub_vibrator = selectedSubVibratorId;
    setEditableOrder((prev) => ({ ...prev, vibrators: updated }));
  };

  return (
    <>
      {editableOrder.pumps.map((pumpItem, index) => {
        const subPumpList = useSubPumpList(selectedPumpIds[index]);

        return (
          <div key={index} className="flex items-center gap-4 mb-2">
            <select
              value={pumpItem.pump?.id || ""}
              onChange={(e) =>
                handlePumpChange(index, parseInt(e.target.value))
              }
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
              onChange={(e) =>
                handleSubPumpChange(index, parseInt(e.target.value))
              }
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
              onChange={(e) =>
                handleVibratorChange(index, parseInt(e.target.value))
              }
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
              onChange={(e) =>
                handleSubVibratorChange(index, parseInt(e.target.value))
              }
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

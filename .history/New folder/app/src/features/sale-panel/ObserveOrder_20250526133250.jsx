import React, { useState, useEffect } from "react";
import useDropdownsData from "../../hooks/useDropdownsData";
import { TrashIcon } from "@heroicons/react/24/solid";
import { PencilIcon } from "@heroicons/react/24/outline";

const ObserveOrder = ({ order, setOrder, editable, setEditableOrder }) => {
  const {
    productList,
    pumpList,
    subPumpList: allSubPumps = [],
    isLoadingSubPumpList,
  } = useDropdownsData();

  const handlePumpChange = (index, pumpId) => {
    const selectedPump = pumpList.find((p) => p.id === parseInt(pumpId));
    const updated = [...editableOrder.pumps];
    updated[index].pump = selectedPump;
    updated[index].sub_pump = null; // Reset sub_pump when pump changes
    setEditableOrder((prev) => ({
      ...prev,
      pumps: updated,
    }));
  };

  const handleSubPumpChange = (index, subPumpId) => {
    const selectedSubPump = allSubPumps.find(
      (sp) => sp.id === parseInt(subPumpId)
    );
    const updated = [...editableOrder.pumps];
    updated[index].sub_pump = selectedSubPump;
    setEditableOrder((prev) => ({
      ...prev,
      pumps: updated,
    }));
  };

  const handleAddPump = () => {
    setEditableOrder((prev) => ({
      ...prev,
      pumps: [...prev.pumps, { pump: null, sub_pump: null }],
    }));
  };

  const handleRemovePump = (index) => {
    const updated = [...editableOrder.pumps];
    updated.splice(index, 1);
    setEditableOrder((prev) => ({
      ...prev,
      pumps: updated,
    }));
  };

  if (!editableOrder) return null;

  return (
    <div className="space-y-4">
      {editableOrder.pumps.map((pump, index) => {
        const currentPumpId = pump.pump?.id;
        const relatedSubPumps = allSubPumps.filter(
          (sp) => sp.parent_pump === currentPumpId
        );

        return (
          <div
            key={index}
            className="flex items-center gap-2 border-b pb-2 mb-2"
          >
            <select
              className="border p-2 rounded w-1/3"
              value={pump.pump?.id || ""}
              onChange={(e) => handlePumpChange(index, e.target.value)}
            >
              <option value="">انتخاب پمپ</option>
              {pumpList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>

            <select
              className="border p-2 rounded w-1/3"
              value={pump.sub_pump?.id || ""}
              onChange={(e) => handleSubPumpChange(index, e.target.value)}
              disabled={!currentPumpId}
            >
              <option value="">زیرپمپ (اختیاری)</option>
              {relatedSubPumps.map((sp) => (
                <option key={sp.id} value={sp.id}>
                  {sp.title}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="text-red-600 hover:text-red-800"
              onClick={() => handleRemovePump(index)}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={handleAddPump}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        افزودن پمپ
      </button>
    </div>
  );
};

export default ObserveOrder;

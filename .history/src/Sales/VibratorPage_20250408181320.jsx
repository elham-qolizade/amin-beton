import React, { useState, useEffect } from "react";

const YourComponent = () => {
  const [selectedVibrators, setSelectedVibrators] = useState([]);
  const [selectedSubVibrators, setSelectedSubVibrators] = useState([]);
  const [newVibrators, setNewVibrators] = useState([]);
  const [newSubVibrators, setNewSubVibrators] = useState([]);

  const handleAddVibrators = () => {
    // فرض کنید که اینجا داده‌ها به‌طور صحیح بارگذاری شده‌اند
    setSelectedVibrators((prev) => [...prev, ...newVibrators]);
    setSelectedSubVibrators((prev) => [...prev, ...newSubVibrators]);
  };

  // برای اطمینان از به‌روزرسانی UI هر بار که وضعیت‌ها تغییر می‌کنند
  useEffect(() => {
    console.log("Updated Selected Vibrators:", selectedVibrators);
    console.log("Updated Selected SubVibrators:", selectedSubVibrators);
  }, [selectedVibrators, selectedSubVibrators]); // ردیابی تغییرات در وضعیت‌ها

  return (
    <div>
      <button onClick={handleAddVibrators}>افزودن ویبراتورها</button>

      <div>
        <h3>ویبراتورهای ثبت‌شده:</h3>
        {selectedVibrators.length > 0 ? (
          selectedVibrators.map((vibrator, index) => (
            <div key={index}>{vibrator.title}</div>
          ))
        ) : (
          <div>هیچ ویبراتوری ثبت نشده است</div>
        )}
      </div>

      <div>
        <h3>زیرویبراتورهای ثبت‌شده:</h3>
        {selectedSubVibrators.length > 0 ? (
          selectedSubVibrators.map((subVibrator, index) => (
            <div key={index}>{subVibrator.title}</div>
          ))
        ) : (
          <div>هیچ زیرویبراتوری ثبت نشده است</div>
        )}
      </div>
    </div>
  );
};

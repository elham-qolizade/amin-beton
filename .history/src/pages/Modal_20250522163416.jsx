import React from "react";

export default function Modal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative p-8 text-white border-2 shadow-lg bg-Bokara-Grey border-School-Bus rounded-2xl w-96">
        <button
          onClick={onClose}
          className="absolute text-lg font-bold top-2 left-2 text-red"
        >
          ×
        </button>
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center">{message}</p>
          <button
            onClick={onClose}
            className="px-6 py-2 font-medium transition hover:text-white bg-School-Bus text-Bokara-Grey rounded-xl hover:opacity-90"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

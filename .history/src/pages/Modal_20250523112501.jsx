import React from "react";

export default function Modal({ isOpen, onClose, message, onClick }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
      <div className="relative w-full max-w-sm p-6 sm:p-8 text-white border-2 shadow-lg bg-Bokara-Grey border-School-Bus rounded-2xl">
        <button
          onClick={onClose}
          className="absolute text-xl font-bold top-2 left-2 text-red"
        >
          ×
        </button>
        <div className="flex flex-col items-center justify-center gap-4 mt-4">
          <p className="text-center text-sm sm:text-base">{message}</p>
          <button
            onClick={() => {
              if (onClick) onClick();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2 text-sm sm:text-base font-medium transition hover:text-white bg-School-Bus text-Bokara-Grey rounded-xl hover:opacity-90"
          >
            تایید
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function () {
  return (
    <div>
      <div className="flex flex-col min-h-screen p-6 text-white bg-Bokara-Grey">
        <div className="container w-full max-w-5xl p-8 bg-gray-800 rounded-xl">
          <h1 className="mb-8 text-sm font-bold text-center md:text-2xl">
            خرید برای <br /> {projectTitle}
          </h1>

          <div className="mb-8">
            <h2 className="text-lg font-bold">پمپ‌ها</h2>
            <div className="flex flex-row flex-wrap gap-6 mt-4 mb-8">
              {uniquePumps.map((pump) => {
                // بررسی عنوان پمپ
                const isSelected = tempSelectedPumps.some(
                  (p) => p.id === pump.pump.id
                ); // توجه کنید که باید از pump.pump.id استفاده کنید

                return (
                  <div
                    key={pump.pump.id} // استفاده از pump.pump.id
                    className={`flex flex-col gap-2 items-center justify-center text-center w-40 border ${
                      isSelected ? "border-School-Bus" : "border-white"
                    } rounded-lg px-4 py-4 cursor-pointer transition-all duration-200 hover:scale-105`}
                    onClick={() => handlePumpSelection(pump.pump.id)} // استفاده از pump.pump.id برای انتخاب پمپ
                  >
                    <div
                      className={`w-4 h-4 mb-2 rounded-full ${
                        isSelected ? "bg-School-Bus" : "bg-white"
                      }`}
                    ></div>
                    <div className="mb-2">{pump.pump.title}</div>{" "}
                    {/* استفاده از pump.pump.title برای نمایش عنوان */}
                  </div>
                );
              })}
            </div>

            {tempSelectedPumps.length > 0 && subPumps.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold">زیرمجموعه‌های پمپ</h3>
                <div className="flex flex-row flex-wrap gap-6 mt-4">
                  {subPumps.map((subPump) => {
                    const isSelected = tempSelectedSubPumps.some(
                      (sp) => sp.id === subPump.id
                    );

                    return (
                      <div
                        key={subPump.id}
                        className={`flex flex-col gap-2 items-center justify-center text-center w-40 border ${
                          isSelected ? "border-School-Bus" : "border-white"
                        } rounded-lg px-4 py-4 cursor-pointer transition-all duration-200 hover:scale-105`}
                        onClick={() => handleSubPumpSelection(subPump.id)}
                      >
                        <div
                          className={`w-4 h-4 mb-2 rounded-full ${
                            isSelected ? "bg-School-Bus" : "bg-white"
                          }`}
                        ></div>
                        <div className="mb-2">{subPump.title}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {tempSelectedPumps.some((pump) => pump.countable) && (
            <div className="flex items-center gap-2 mt-4">
              <label htmlFor="totalQty" className="text-sm">
                تعداد پمپ
              </label>
              <input
                id="totalQty"
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-24 p-2 text-black border rounded-md"
              />
            </div>
          )}

          {/* دکمه افزودن پمپ‌ها */}
          <div className="flex justify-center gap-6 px-10 mt-10">
            <Button className="px-10" onClick={handleAddAndSubmit}>
              افزودن پمپ‌ها
            </Button>
          </div>

          {/* نمایش انتخاب‌های پمپ‌ها */}

          <Button
            className="px-10"
            onClick={() => {
              handleAddAndSubmit();
              navigate(`/VibratorPage/${orderId}`); // مقدار orderId را مقداردهی کنید
            }}
          >
            ادامه
          </Button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            message={modalMessage}
          />
        </div>
      </div>
    </div>
  );
}

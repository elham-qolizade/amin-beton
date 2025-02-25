import React from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../constans"; // فرض بر این است که لیست محصولات را از اینجا می‌گیرید

export default function ProductsLanding() {
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    if (id === 2) {
      navigate("/product/2"); // صفحه AboutBluck (بلوک‌های بتنی)
    } else if (id === 1) {
      navigate("/product/1"); // صفحه Salbs (دال‌های بتنی)
    } else if (id === 3) {
      navigate("/product/3"); // صفحه Pipe (لوله‌های بتنی) ✅ اصلاح شده
    } else if (id === 4) {
      navigate("/product/4"); // صفحه Table (جداول بتنی) ✅ اصلاح شده
    } else {
      navigate(`/product/${id}`); // سایر محصولات
    }
  };

  return (
    <div className="flex items-center justify-center pt-10 min-h-screen md:pt-24 bg-Bokara-Grey">
      <div className="grid container grid-cols-1 sm:grid-cols-7 gap-4">
        <div className="grid grid-rows-1 px-10 md:p-0 sm:grid-rows-5 gap-4 text-white sm:col-span-2">
          {products
            .filter((product) => !product.isMain)
            .map((product, index) => (
              <div
                key={product.id}
                className={`product-card h-14 sm:h-96 child-${index + 1}`}
                onClick={() => handleNavigate(product.id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image w-full h-auto"
                />
                <div className="product-overlay">
                  <h4 className="font-bold md:text-3xl text-xl text-School-Bus">
                    {product.title}
                  </h4>
                </div>
              </div>
            ))}
        </div>

        <div className="grid grid-rows-1 px-10 md:p-0 sm:grid-rows-2 gap-5 text-white sm:col-span-5">
          {products
            .filter((product) => product.isMain)
            .map((product, index) => (
              <div
                key={product.id}
                className={`product-card h-96 sm:h-96 child-${index + 3}`}
                onClick={() => handleNavigate(product.id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image w-full h-auto"
                />
                <div className="product-overlay">
                  <h3 className="md:text-3xl text-xl font-bold text-School-Bus">
                    {product.title}
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

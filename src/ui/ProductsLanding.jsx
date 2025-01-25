import React from "react";
import { products } from "../constans"; // فرض می‌کنیم که داده‌ها از این فایل وارد می‌شوند

export default function ProductsLanding() {
  return (
    <div className="flex items-center justify-center min-h-screen p-10 pt-24 bg-Bokara-Grey">
      <div className="grid grid-cols-7 gap-4">
        {/* محصولات سمت چپ */}
        <div className="grid col-span-2 grid-rows-5 gap-4 text-white">
          {products
            .filter((product) => !product.isMain)
            .map((product, index) => (
              <div
                key={product.id}
                className={`product-card child-${index + 1}`} // اضافه کردن کلاس child-X
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <div className="product-overlay">
                  <h4 className="product-title">{product.title}</h4>
                </div>
              </div>
            ))}
        </div>

        {/* محصولات سمت راست */}
        <div className="grid col-span-5 grid-rows-2 gap-5 text-white">
          {products
            .filter((product) => product.isMain)
            .map((product, index) => (
              <div
                key={product.id}
                className={`product-card h-96 child-${index + 3}`} // اضافه کردن کلاس child-X
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <div className="product-overlay">
                  <h3
                    className={`product-title ${
                      product.id === 1 ? "yellow" : ""
                    }`}
                  >
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

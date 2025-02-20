import React from "react";
import { products } from "../constans";

export default function ProductsLanding() {
  return (
    <div className="flex items-center justify-center min-h-screen p-10 pt-24 bg-Bokara-Grey">
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 w-full">
        <div className="grid grid-rows-1 sm:grid-rows-5 gap-4 text-white sm:col-span-2">
          {products
            .filter((product) => !product.isMain)
            .map((product, index) => (
              <div
                key={product.id}
                className={`product-card h-14 sm:h-96 child-${index + 1} `}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image w-full h-auto"
                />
                <div className="product-overlay">
                  <h4 className="font-bold md:text-3xl  text-xl text-School-Bus">
                    {product.title}
                  </h4>
                </div>
              </div>
            ))}
        </div>

        <div className="grid grid-rows-1 sm:grid-rows-2 gap-5 text-white sm:col-span-5">
          {products
            .filter((product) => product.isMain)
            .map((product, index) => (
              <div
                key={product.id}
                className={`product-card h-96 sm:h-96 child-${index + 3}`}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image w-full h-auto"
                />
                <div className="product-overlay">
                  <h3
                    className={`md:text-3xl text-xl font-bold text-School-Bus product-title ${
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

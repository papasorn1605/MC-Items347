import React from "react";
import "../index.css"; // อย่าลืมนำเข้าไฟล์ CSS

const ProductList = ({ products, onAddToCart, cartItems, onDecreaseQuantity }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-300">
      <h2 className="text-xl font-semibold mb-4">รายการสินค้า</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;
          const totalPrice = quantity * product.price;

          return (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 border border-gray-300"
            >
              <div className="product-container">
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <div className="p-4">
                  <h2 className="product-name">{product.name}</h2>
                  <p className="text-gray-500 text-center">฿{product.price.toFixed(2)}</p>
                  <div className="flex items-center mt-4 justify-center">
                    {/* ปุ่มลบ */}
                    <button
                      onClick={() => onDecreaseQuantity(product.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors duration-300"
                      disabled={quantity === 0}
                    >
                      -
                    </button>
                    {/* แสดงจำนวนสินค้า */}
                    <span className="text-lg mx-2">{quantity}</span>
                    {/* ปุ่มบวก */}
                    <button
                      onClick={() => onAddToCart(product)}
                      className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition-colors duration-300"
                    >
                      +
                    </button>
                  </div>
                  {quantity > 0 && (
                    <p className="mt-2 text-lg text-gray-700 text-center">
                      ทั้งหมด: ฿{totalPrice.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;

import React from "react";
import { Link } from "react-router-dom";

const ShoppingCart = ({ cartItems, onRemoveFromCart, onDecreaseQuantity, onAddToCart, getTotalPrice }) => {
  const shippingCost = 100; // ค่าขนส่ง
  const totalPrice = getTotalPrice();

  return (
    <div className="shopping-cart bg-white shadow-lg rounded-lg p-4 border border-gray-300 h-full">
      <h2 className="text-2xl font-semibold mb-4 border border-gray-400 rounded-lg p-2 text-center text-black">
        ตะกร้าสินค้า
      </h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p className="text-center text-black">รถเข็นของคุณว่างเปล่า</p>
        </div>
      ) : (
        <div className="shopping-cart-grid">
          {cartItems.map((item) => (
            <div key={item.id} className="product-card">
              <img src={item.image} alt={item.name} className="product-image" />
              <p className="font-medium">{item.name}</p>
              <p>฿{item.price.toFixed(2)}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => onDecreaseQuantity(item.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md shadow-md"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => onAddToCart(item)}
                  className="px-2 py-1 bg-green-500 text-white rounded-md shadow-md"
                >
                  +
                </button>
                <button
                  onClick={() => onRemoveFromCart(item.id)} // ฟังก์ชันลบสินค้า
                  className="deleee"
                >
                  ลบทั้งหมด
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="total-price">
        <h3 className="text-lg font-bold text-black">
          ทั้งหมด: ฿{totalPrice.toFixed(2)} (รวมค่าขนส่ง: ฿{shippingCost})
        </h3>
      </div>

      <div className="mt-4 text-center"> <br />
        <Link to="/" className="custom-button mx-2">
          ย้อนกลับ
        </Link>
        <Link 
          to="/checkout" 
          className="custom-button mx-2 opacity-50 cursor-not-allowed"
          onClick={(e) => e.preventDefault()} // ป้องกันการคลิก
        >
          ชำระเงิน
        </Link>
      
      </div>
      <br />
    </div>
  );
};

export default ShoppingCart;

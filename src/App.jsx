import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import ProductList from "./components/ProductList"; // ส่วนที่แสดงรายการสินค้า
import ShoppingCart from "./components/ShoppingCart"; // ส่วนที่แสดงตะกร้าสินค้า
import Footer from "./components/Footer"; // ส่วนท้าย

const App = () => {
  // รายการสินค้า
  const products = [
    { id: 1, name: "ไก่พูดได้", price: 599.99, image: "/IMG_4830.JPG" },
    { id: 2, name: "ไอเท็มตกแต่งห้อง", price: 899.99, image: "/IMG_4831.JPG" },
    { id: 3, name: "อุปกรณ์สุดแข็งแกร่ง", price: 299.99, image: "/IMG_4832.JPG" },
    { id: 4, name: "ชุดตกแต่งสะพาน", price: 399.99, image: "/IMG_4835.JPG" },
    { id: 5, name: "ปุ๊กปิ๊ก", price: 799.99, image: "/IMG_4836.JPG" },
    { id: 6, name: "สัตว์ตัวน้อย", price: 499.99, image: "/IMG_4837.JPG" },
    { id: 7, name: "อัพเกรดสมุด", price: 249.99, image: "/IMG_4838.JPG" },
    { id: 8, name: "สัตว์ใหม่ ๆ", price: 699.99, image: "/IMG_4839.JPG" },
    { id: 9, name: "Add-On อุ้ม", price: 350.0, image: "/IMG_4840.JPG" },
    { id: 10, name: "ผจญภัย", price: 450.0, image: "/IMG_4841.JPG" },
    { id: 11, name: "ดินแดนทะเลทรายใหม่", price: 150.0, image: "/IMG_4848.JPG" },
    { id: 12, name: "แมพเอาชีวิตรอด", price: 250.0, image: "/IMG_4843.JPG" },
    { id: 13, name: "สกิน", price: 550.0, image: "/IMG_4845.JPG" },
    { id: 14, name: "ภาพสวยงาม", price: 650.0, image: "/IMG_4846.JPG" },
    { id: 15, name: "อาหารใหม่ ๆ", price: 850.0, image: "/IMG_4847.JPG" },
  ];

  // สถานะของตะกร้าสินค้า
  const [cartItems, setCartItems] = useState([]);

  // ฟังก์ชันเพิ่มสินค้าในตะกร้า
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // ฟังก์ชันลบสินค้าออกจากตะกร้า
  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // ฟังก์ชันลดจำนวนสินค้าลง 1
  const handleDecreaseQuantity = (id) => {
    const existingItem = cartItems.find((item) => item.id === id);
    if (existingItem.quantity > 1) {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      handleRemoveFromCart(id);
    }
  };

  // ฟังก์ชันคำนวณราคาสุทธิ
  const getTotalPrice = () => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shipping = 100; // ค่าขนส่ง
    return subtotal + shipping; // ราคาสุทธิรวมค่าขนส่ง
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="header-title py-4 text-center text-3xl bg-black text-white w-full">
        Minecraft items
        </header>

        {/* Content */}
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ProductList
                    products={products}
                    onAddToCart={handleAddToCart}
                    cartItems={cartItems}
                    onDecreaseQuantity={handleDecreaseQuantity}
                  />
                  <br />
                  <div className="flex justify-center mt-4">
                    <Link to="/cart" className="custom-button">
                    ไปที่ตะกร้าสินค้า
                    </Link>
                  </div>
                  <br />
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <div>
                  <ShoppingCart
                    cartItems={cartItems}
                    onRemoveFromCart={handleRemoveFromCart}
                    onDecreaseQuantity={handleDecreaseQuantity}
                    onAddToCart={handleAddToCart}
                    getTotalPrice={getTotalPrice}
                  />
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <FooterVisibility />
      </div>
    </Router>
  );
};

// คอมโพเนนต์เพื่อจัดการการแสดง Footer
const FooterVisibility = () => {
  const location = useLocation();
  
  // ตรวจสอบว่าเป็นหน้า Product List หรือไม่
  if (location.pathname !== '/') {
    return null; // ไม่แสดง Footer ในหน้าอื่น
  }
  
  return <Footer />; // แสดง Footer ในหน้า Product List
};

export default App;

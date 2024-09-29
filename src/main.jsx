import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // ลองคอมเมนต์บรรทัดนี้ออกถ้าต้องการทดสอบ

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

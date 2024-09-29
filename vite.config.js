// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // เพิ่มการตั้งค่านี้
  assetsInclude: ['**/*.JPG', '**/*.jpg'],
});

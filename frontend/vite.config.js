import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const backendUrl = process.env.BACKEND_URL;

const END_POINT = backendUrl;
console.log('Endpoint: ', END_POINT);
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      '/api': {
        target: END_POINT,
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
});

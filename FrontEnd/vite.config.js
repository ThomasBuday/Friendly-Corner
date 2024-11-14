import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This will make the server accessible externally 
    port: 3000, // Change the port to 3000
    proxy: {
      '/api': {
        target: 'https://localhost:7177',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});



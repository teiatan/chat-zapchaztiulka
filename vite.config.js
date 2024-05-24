import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      jsx: 'automatic',
    },
  },

  plugins: [react(), svgr()],

  base: '/chat-zapchaztiulka/',

  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },

  resolve: {
    alias: {
      '@': '/src',
    },
  },

  server: {
    port: 5173,
  },
});

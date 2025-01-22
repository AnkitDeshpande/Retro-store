import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    outDir: 'dist', // Ensure Vite outputs to the 'dist' directory
    sourcemap: true, // Optional: helpful for debugging production builds
    rollupOptions: {
      output: {
        manualChunks: {
          // Optionally, split vendor and app code for optimization
          vendor: ['react', 'react-dom', 'react-router', '@reduxjs/toolkit'],
        },
      },
    },
  },
  server: {
    port: 3000, // Optional: customize the dev server port
    open: true, // Open the browser automatically when running `vite`
  },
});

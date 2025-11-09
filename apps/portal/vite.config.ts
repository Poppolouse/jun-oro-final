import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config for portal app
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3102,
    open: false
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/src/data/')) return 'course-content';
          if (id.includes('node_modules/pdfjs-dist')) return 'pdf-engine';
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion') || id.includes('node_modules/@radix-ui')) return 'interaction';
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react';
        },
      },
    },
  },
  preview: {
    port: 3102,
    host: true
  }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'localized-jsx',
    enforce: 'post',
    transform(code, id) {
      if (!id.includes('/src/') || !id.endsWith('.tsx') || id.includes('/src/i18n/')) return;
      // Resolve our local runtime after JSX compilation, avoiding a second copy of the locale context in dependency prebundling.
      return { code: code.replace(/(['"])react\/jsx-(dev-)?runtime\1/g, (_, quote, dev) => `${quote}@dsi/locale/jsx-${dev || ''}runtime${quote}`), map: null };
    },
  }],
  resolve: { alias: { '@dsi/locale': fileURLToPath(new URL('./src/i18n', import.meta.url)) } },
  optimizeDeps: { exclude: ['@dsi/locale', '@dsi/locale/jsx-runtime', '@dsi/locale/jsx-dev-runtime'] },
  server: {
    port: 3102,
    open: false
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/src/i18n/translations.json')) return 'translations';
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

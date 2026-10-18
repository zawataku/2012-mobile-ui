/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? '2012-mobile-ui.js' : '2012-mobile-ui.cjs'),
      cssFileName: 'style',
    },
    rolldownOptions: {
      // react/jsx-runtime なども含め、React 本体はバンドルしない
      external: [/^react($|\/)/, /^react-dom($|\/)/],
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
  },
});

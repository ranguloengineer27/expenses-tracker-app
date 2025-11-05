import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/ui/components'),
    },
  },
  /* server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3009',
        changeOrigin: true,
      },
    },
  }, */
});

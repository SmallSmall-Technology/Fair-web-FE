import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';
import fs from 'fs';

export default defineConfig({
  // server: {
  //   https: {
  //     key: fs.readFileSync('./localhost-key.pem'),
  //     cert: fs.readFileSync('./localhost.pem'),
  //   },
  //   host: 'localhost',
  //   port: 5174,
  // },
  plugins: [
    react(),
    viteCompression({ algorithm: 'gzip' }),
    viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
  ],
  optimizeDeps: {
    include: ['react-router-dom'],
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router-dom')) return 'react-router-dom';
            if (id.includes('lodash-es')) return 'lodash';
            return 'vendor';
          }
        },
      },
    },
  },
});

/// <reference types='vite/client' />

import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'process.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
      'process.env.VITE_AUTH_TOKEN_KEY_NAME': JSON.stringify(env.VITE_AUTH_TOKEN_KEY_NAME),
    },
    server: {
      open: '/',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src/')
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [
        './src/setupTests.ts'
      ]
    },
    build: {
      target: 'esnext'
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./src/app/styles/styles";'
        }
      }
    }
  };
});

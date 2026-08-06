import checker from 'vite-plugin-checker';
import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

// utils
import viteSvgReactComponent from './config/viteSvgReactComponent';
import writeSassVariables from './config/generateSassVariables';

writeSassVariables();

export default defineConfig({
  build: {
    outDir: 'build',
  },
  css: {
    modules: {
      generateScopedName: '[local]_[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        additionalData: (content: string) => `@use 'xd-variables' as *;\n${content}`,
        loadPaths: [path.resolve(__dirname, 'config/generated')],
      },
    },
  },
  define: {
    'process.env': {},
  },
  plugins: [
    react(),
    tsconfigPaths(),
    viteSvgReactComponent(),
    checker({
      typescript: {
        tsconfigPath: 'tsconfig.vite.json',
      },
    }),
  ],
  server: {
    port: 3000,
  },
});

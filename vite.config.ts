import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

// utils
import { sharedCssConfig, sharedResolveAlias, viteSvgReactComponent } from './vite.shared';

export default defineConfig({
  build: {
    outDir: 'build',
  },
  css: sharedCssConfig,
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
  resolve: {
    alias: sharedResolveAlias,
  },
  server: {
    port: 3000,
  },
});

import checker from 'vite-plugin-checker';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

// utils
import { sharedCssConfig, sharedResolveAlias, viteSvgReactComponent } from './vite.shared';
import viteCleanConsole from './viteCleanConsole';

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
    viteCleanConsole(),
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

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { UserConfig } from 'vite';

// utils
import viteSvgReactComponent from './viteSvgReactComponent.js';
import writeSassVariables from './generateSassVariables.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

writeSassVariables();

export const sharedCssConfig: UserConfig['css'] = {
  modules: {
    generateScopedName: '[local]_[hash:base64:5]',
  },
  preprocessorOptions: {
    scss: {
      additionalData: (content: string) => `@use 'xd-variables' as *;\n${content}`,
      loadPaths: [path.resolve(__dirname, 'generated')],
    },
  },
};

export const sharedResolveAlias: Record<string, string> = {
  assets: path.resolve(__dirname, '../src/assets'),
};

export { viteSvgReactComponent };

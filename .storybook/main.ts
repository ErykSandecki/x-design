import type { StorybookConfig } from '@storybook/react-vite';

import tsconfigPaths from 'vite-tsconfig-paths';
import { mergeConfig } from 'vite';

// utils
import { sharedCssConfig, sharedResolveAlias } from '../vite.shared.ts';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-onboarding'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) =>
    mergeConfig(config, {
      css: sharedCssConfig,
      plugins: [tsconfigPaths()],
      resolve: {
        alias: sharedResolveAlias,
      },
    }),
};

export default config;

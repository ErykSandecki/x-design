import type { StorybookConfig } from '@storybook/react-webpack5';

import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// styles
import sassImports from '../config/sassImports.js';
import sassList from '../config/sassList.js';
import sassMaps from '../config/sassMaps.js';
import sassMixins from '../config/sassMixins.js';
import sassVariables from '../config/sassVariables.js';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-webpack5-compiler-swc', '@storybook/addon-docs', '@storybook/addon-onboarding'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        fsCache: true,
        lazyCompilation: true,
      },
    },
  },
  webpackFinal: async (config) => {
    config.module!.rules = config.module!.rules?.filter((rule: any) => !rule.test?.toString().includes('svg'));

    config.module!.rules!.push({
      test: /\.svg$/,
      include: path.resolve(__dirname, '../src/assets/svg'),
      use: [
        {
          loader: require.resolve('@svgr/webpack'),
          options: {
            exportType: 'named',
            namedExport: 'ReactComponent',
            prettier: false,
            svgo: false,
            svgoConfig: { plugins: [{ removeViewBox: false }] },
            titleProp: true,
            ref: true,
          },
        },
      ],
    });

    config.module!.rules!.push({
      test: /\.svg$/,
      exclude: path.resolve(__dirname, '../src/assets/svg'),
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext][query]',
      },
    });

    config.module!.rules!.push({
      test: /\.scss$/i,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: {
              exportOnlyLocals: false,
              localIdentName: `${'cl__'}[local]__[contenthash:base64:5]`,
              namedExport: false,
            },
          },
        },
        {
          loader: 'sass-loader',
          options: {
            additionalData: async (content: any) => {
              return sassImports + sassList + sassVariables() + sassMaps() + sassMixins + content;
            },
            sourceMap: true,
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });

    config.resolve!.alias = {
      ...(config.resolve?.alias ?? {}),
      api: path.resolve(process.cwd(), 'src/api'),
      assets: path.resolve(process.cwd(), 'src/assets'),
      components: path.resolve(process.cwd(), 'src/components'),
      config: path.resolve(process.cwd(), 'src/config'),
      constant: path.resolve(process.cwd(), 'src/constant'),
      core: path.resolve(process.cwd(), 'src/core'),
      hooks: path.resolve(process.cwd(), 'src/hooks'),
      mocks: path.resolve(process.cwd(), 'src/mocks'),
      pages: path.resolve(process.cwd(), 'src/pages'),
      shared: path.resolve(process.cwd(), 'src/shared'),
      store: path.resolve(process.cwd(), 'src/store'),
      test: path.resolve(process.cwd(), 'src/test'),
      translations: path.resolve(process.cwd(), 'src/translations'),
      types: path.resolve(process.cwd(), 'src/types'),
      utils: path.resolve(process.cwd(), 'src/utils'),
      stories: path.resolve(process.cwd(), 'src/stories'),
    };

    return config;
  },
};

export default config;

const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

const sassImports = require('./sassImports');
const sassList = require('./sassList');
const sassMaps = require('./sassMaps');
const sassMixins = require('./sassMixins');
const sassVariables = require('./sassVariables');

const getClientEnvironment = require('./env');
const hasJsxRuntime = require('./utils/hasJsxRuntime');
const paths = require('./paths');

const disableESLintPlugin = process.env.DISABLE_ESLINT_PLUGIN === 'true';
const emitErrorsAsWarnings = process.env.ESLINT_NO_DEV_ERRORS === 'true';
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));
const isDevelopment = process.env.NODE_ENV === 'development';

const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: paths.appIndexTs,
  ignoreWarnings: [() => true],
  infrastructureLogging: {
    level: 'none',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: imageInlineSizeLimit,
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: require.resolve('@svgr/webpack'),
            options: {
              prettier: false,
              svgo: false,
              svgoConfig: {
                plugins: [{ removeViewBox: false }],
              },
              titleProp: true,
              ref: true,
            },
          },
          {
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash].[ext]',
            },
          },
        ],
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                exportOnlyLocals: false,
                localIdentName: `${isDevelopment ? '' : 'cl__'}[local]__[contenthash:base64:5]`,
                namedExport: false,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: async (content) => {
                return sassImports + sassList + sassVariables() + sassMaps() + sassMixins + content;
              },
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.base.json',
        },
      },
    ],
  },
  output: {
    assetModuleFilename: 'static/media/[name].[hash][ext]',
    path: paths.appBuild,
    publicPath: '/',
  },
  plugins: [
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
    new webpack.DefinePlugin(env.stringified),
    !disableESLintPlugin &&
      new ESLintPlugin({
        // Plugin options
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        emitWarning: false,
        formatter: require.resolve('react-dev-utils/eslintFormatter'),
        eslintPath: require.resolve('eslint'),
        failOnError: !(isDevelopment && emitErrorsAsWarnings),
        context: paths.appSrc,
        cache: true,
        cacheLocation: path.resolve(paths.appNodeModules, '.cache/.eslintcache'),
        // ESLint class options
        cwd: paths.appPath,
        resolvePluginsRelativeTo: __dirname,
        baseConfig: {
          extends: [require.resolve('eslint-config-react-app/base')],
          rules: {
            ...(!hasJsxRuntime && {
              'react/react-in-jsx-scope': 'error',
            }),
          },
        },
      }),
  ].filter(Boolean),
  resolve: {
    extensions: ['.*', '.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    fallback: { querystring: require.resolve('querystring-es3') },
  },
};

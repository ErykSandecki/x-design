module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          api: './src/api',
          assets: './src/assets',
          components: './src/components',
          config: './src/config',
          constant: './src/constant',
          core: './src/core',
          hooks: './src/hooks',
          mocks: './src/mocks',
          pages: './src/pages',
          shared: './src/shared',
          store: './src/store',
          test: './src/test',
          translations: './src/translations',
          types: './src/types',
          utils: './src/utils',
        },
        root: ['./src'],
      },
    ],
  ],
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
};

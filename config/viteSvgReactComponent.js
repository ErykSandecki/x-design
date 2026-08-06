const fs = require('fs');

const { transform } = require('@svgr/core');
const babel = require('@babel/core');

const svgrConfig = {
  jsxRuntime: 'automatic',
  namedExport: 'ReactComponent',
  exportType: 'named',
  plugins: ['@svgr/plugin-jsx'],
  ref: true,
  svgo: false,
  titleProp: true,
};

const viteSvgReactComponent = () => ({
  name: 'svg-react-component',
  enforce: 'post',
  async transform(code, id) {
    if (!id.endsWith('.svg')) {
      return;
    }

    const raw = fs.readFileSync(id, 'utf-8');
    const jsxCode = await transform(raw, svgrConfig, { componentName: 'ReactComponent' });
    const { code: componentCode } = babel.transform(jsxCode, {
      babelrc: false,
      configFile: false,
      filename: `${id}.jsx`,
      presets: [['@babel/preset-react', { runtime: 'automatic' }]],
    });

    return { code: `${code}\n${componentCode}`, map: null };
  },
});

module.exports = viteSvgReactComponent;

const chalk = require('react-dev-utils/chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const openBrowser = require('react-dev-utils/openBrowser');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
const {
  choosePort,
  createCompiler,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');

const config = require('../config/webpack.dev');
const createDevServerConfig = require('../config/webpackDevServer');
const logo = require('../config/logo');
const paths = require('../config/paths');
const appName = require(paths.appPackageJson).name;
const useTypeScript = true;

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const isInteractive = process.stdout.isTTY;

checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    return choosePort(HOST, DEFAULT_PORT);
  })
  .then((port) => {
    if (port == null) {
      return;
    }

    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const urls = prepareUrls(protocol, HOST, port);

    const compiler = createCompiler({
      appName,
      webpack,
      urls,
      config,
      useTypeScript,
    });

    const serverConfig = {
      ...createDevServerConfig(),
      host: HOST,
      port,
    };

    const devServer = new WebpackDevServer(serverConfig, compiler);

    devServer.startCallback(() => {
      if (isInteractive) {
        clearConsole();
      }

      console.log(
        chalk.white(`${logo} \n \n \n`),
        chalk.white('X/Design: '),
        chalk.cyan(`Starting the development server...`),
      );

      openBrowser(urls.localUrlForBrowser);
    });
  })
  .catch((err) => {
    if (err && err.message) {
      console.log(err.message);
    }

    process.exit(1);
  });

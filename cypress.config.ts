import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    excludeSpecPattern: ['**/classNames.ts', '**/constants.ts', '**/enums.ts', '**/selectors.ts'],
    setupNodeEvents(on, config) {
      // eslint-disable-next-line
      return require('./cypress/plugins/index.ts')(on, config);
    },
    specPattern: 'cypress/test/**/*.{js,jsx,ts,tsx}',
  },
  projectId: 'ovggcr',
  screenshotOnRunFailure: false,
  video: false,
  viewportHeight: 840,
  viewportWidth: 1400,
});

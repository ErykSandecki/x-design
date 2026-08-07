import path, { dirname } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { createRequire } from 'module';
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';

// utils
import { sharedResolveAlias } from './config/vite.shared';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetMockPath = path.resolve(__dirname, '__mocks__/svgrMock.jsx');
const cssExtension = /\.(css|scss)$/;
const mockedAssetExtension = /\.(bmp|gif|jpe?g|png|webp|ttf|svg|woff2?|mp4|webm|wav|mp3|m4a|aac|oga)$/;
const require = createRequire(import.meta.url);
const identityObjProxyPath = require.resolve('identity-obj-proxy');

// Vitest's own CSS-modules transform doesn't register a class from a selector that has only
// nested rules and no direct declarations (a common BEM pattern here) — bypassing SCSS
// compilation entirely and returning class names as-is (matching Jest's identity-obj-proxy)
// sidesteps that gap and keeps tests decoupled from real CSS output, same as before.
const mockAssetImports = (): {
  enforce: 'pre';
  name: string;
  resolveId(id: string): string | undefined;
} => ({
  enforce: 'pre' as const,
  name: 'mock-asset-imports',
  resolveId(id: string): string | undefined {
    const bareId = id.split('?')[0];

    if (mockedAssetExtension.test(bareId)) {
      return assetMockPath;
    }

    if (cssExtension.test(bareId)) {
      return identityObjProxyPath;
    }
  },
});

export default defineConfig({
  plugins: [tsconfigPaths(), mockAssetImports()],
  resolve: {
    alias: sharedResolveAlias,
  },
  test: {
    coverage: {
      exclude: [
        '**/*classNames*',
        '**/*classNames*/**',
        '**/*constants*',
        '**/*constants*/**',
        '**/*keys*',
        '**/*keys*/**',
        '**/mock/*',
        '**/*.d.ts',
        '**/*.stories.tsx',
        'src/api/**',
        'src/components/App/App.tsx',
        'src/config/**',
        'src/core/Routing/Routing.tsx',
        'src/core/Routing/guards/**',
        'src/hooks/useScrollLock/constants.ts',
        'src/index.tsx',
        'src/library/**',
        'src/store/appInitializer/**',
        'src/store/configureStore.ts',
        'src/store/reducers.ts',
        'src/store/store.ts',
        'src/store/watchers.ts',
        'src/stories/**',
        'src/test/**',
        'src/translations/**',
        'src/types/**',
        'src/utils/history/**',
      ],
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      provider: 'istanbul',
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    environment: 'jsdom',
    globals: true,
    include: ['src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
    mockReset: true,
    resolveSnapshotPath: (testPath, snapshotExtension) =>
      path.join(path.dirname(testPath), 'snapshots', `${path.basename(testPath)}${snapshotExtension}`),
    setupFiles: ['./src/setupTests.ts'],
  },
});

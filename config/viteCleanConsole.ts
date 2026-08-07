import type { Plugin } from 'vite';

const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

const viteCleanConsole = (): Plugin => ({
  apply: 'serve',
  configureServer(server) {
    server.watcher.on('change', () => {
      console.clear();
    });
  },
  handleHotUpdate() {
    console.log(`${GREEN}Compiled successfully!${RESET}`);
  },
  name: 'clean-console',
});

export default viteCleanConsole;

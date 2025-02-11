import { Chart, registerables } from 'chart.js';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

// components
import App from './components/App/App';

// core
import { ContextProvider } from 'core/ContextProvider/ContextProvider';

// store
import { store } from 'store/store';

// styles
import './index.scss';

// utils
import { appendOverlayContainers } from 'config';
import { setTheme } from 'store/appInitializer/actions';

appendOverlayContainers();

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ContextProvider actionOnChangeTheme={setTheme}>
      <App />
    </ContextProvider>
  </Provider>,
);

Chart.register(...registerables);

window.store = store;

import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Preview } from '@storybook/react';
import { Provider } from 'react-redux';

// core
import { TooltipProvider } from '../src/shared/UI/Tooltip/core/TooltipProvider';

// store
import { configureStore } from '../src/store/store';

// styles
import './styles/index.scss';

// utils
import i18n from './i18next.js';
import { appendOverlayContainers } from '../src/config/appendOverlayContainers';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export const composed = (Story: any) => {
  appendOverlayContainers();

  return (
    <Suspense fallback={<div>loading translations...</div>}>
      <BrowserRouter>
        <I18nextProvider i18n={i18n}>
          <TooltipProvider>
            <Provider store={configureStore()}>
              <Story />
            </Provider>
          </TooltipProvider>
        </I18nextProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export const decorators = [composed];

export default preview;

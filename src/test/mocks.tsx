import i18n from 'i18next';
import timekeeper from 'timekeeper';
import { initReactI18next } from 'react-i18next';
import { ReactNode } from 'react';

// others
import resource from 'translations/languages/en.json';
import { AVAILABLE_LANGUAGES } from 'translations/constants';

/**
 * React Portal
 */
jest.mock('react-dom', () => ({
  ...(jest.requireActual('react-dom') as Object),
  createPortal: (children: ReactNode) => children,
}));

/**
 * Hide dirt errors
 */
console.error = () => {};
console.warn = () => {};

/**
 * Mock Date
 */
timekeeper.freeze(new Date('2020-01-01'));

/**
 * Mock Language
 */
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  lng: AVAILABLE_LANGUAGES[0],
  resources: {
    [AVAILABLE_LANGUAGES[0]]: {
      translation: resource,
    },
  },
});

/**
 * Mock Scroll Into View To Avoid Errors
 */
Element.prototype.scrollIntoView = () => {};

/**
 * Mock Scroll To Avoid Errors
 */
Element.prototype.scrollTo = () => {};

/**
 * Mock Prompt & Confirm
 */
delete (window as any).prompt;
(window as any).prompt = jest.fn(() => true);
(window as any).confirm = jest.fn(() => true);

/**
 * Mock copy to clipboard
 */
document.execCommand = jest.fn();

import i18n from 'i18next';
import timekeeper from 'timekeeper';
import { initReactI18next } from 'react-i18next';
import { ReactNode } from 'react';

// others
import resource from 'translations/languages/en.json';
import { AVAILABLE_LANGUAGES } from 'translations/constants';

// types
import { HTMLContainerId } from 'types';

// utils
import { createHtmlElement } from 'utils';

/**
 * React Portal
 */
vi.mock('react-dom', async (importOriginal) => ({
  ...((await importOriginal()) as Object),
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
(window as any).prompt = vi.fn(() => true);
(window as any).confirm = vi.fn(() => true);

/**
 * Mock copy to clipboard
 */
document.execCommand = vi.fn();

/**
 * Mock containers
 */
document.body.appendChild(createHtmlElement('div', { id: HTMLContainerId.tooltip }));
document.body.appendChild(createHtmlElement('div', { id: HTMLContainerId.dropdown }));

/**
 * Mock to avoid other keys when different environment
 */
vi.mock('react-device-detect', () => ({
  isMacOs: true,
}));

/**
 * Mock DOM Matrix
 */
vi.mock('../utils/dom/getOriginElementBounding', () => ({
  getOriginElementBounding: (element: HTMLElement) => ({
    x: 0,
    y: 0,
    bottom: 0,
    height: parseFloat(element.style.height),
    left: 0,
    right: 0,
    top: 0,
    width: parseFloat(element.style.width),
  }),
}));

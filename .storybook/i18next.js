import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// others
import en from '../src/translations/languages/en.json';

const ns = ['common'];
const supportedLngs = ['en'];

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  defaultNS: 'common',
  ns,
  supportedLngs,
});

i18n.addResourceBundle('en', 'common', en);

export default i18n;

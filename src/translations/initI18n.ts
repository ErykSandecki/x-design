import i18n, { i18n as i18nInterface } from 'i18next';
import { initReactI18next } from 'react-i18next';

// others
import { DEFAULT_LANGUAGE } from './constants';
import { resources } from './resources';

// types
import { TObject } from 'types';

export const initI18n = async (
  language: string,
  resource: TObject<string>,
): Promise<{ i18n: i18nInterface }> => {
  i18n.use(initReactI18next).init({
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
    lng: language,
    resources: {
      [language]: {
        translation: {
          ...resources[language],
          ...resource,
        },
      },
    },
  });

  return { i18n };
};

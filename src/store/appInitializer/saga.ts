import { put, take } from 'redux-saga/effects';

// others
import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  initI18n,
  LANGUAGE,
  LOCATION_API,
} from 'translations';
import { INIT_LANGUAGE_SUCCESS } from './actionsType';
import { resources } from 'translations/resources';

// store
import { initLanguageSuccess, setIsAppLoaded } from './actions';

export function* appInitSaga(): any {
  yield take(INIT_LANGUAGE_SUCCESS);

  try {
    yield put(setIsAppLoaded(true));
    // eslint-disable-next-line
  } catch (_) {
    yield put(setIsAppLoaded(false));
  }
}

export function* initLanguageSaga(): any {
  let language = localStorage.getItem(LANGUAGE) || '';

  if (!language) {
    language = yield fetch(LOCATION_API)
      .then(async (response) => {
        const data = await response.json();
        const language = data?.languages.substring(0, 2);

        return AVAILABLE_LANGUAGES.includes(language)
          ? language
          : DEFAULT_LANGUAGE;
      })
      .catch(() => DEFAULT_LANGUAGE);

    localStorage.setItem(LANGUAGE, language);
  }

  yield Promise.resolve(initI18n(language, resources[language]));
  yield put(initLanguageSuccess(language));
}

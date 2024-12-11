// mocks
import { appInitializerStateMock } from 'test/mocks/reducer/appInitializerMock';

// others
import { REDUCER_KEY as APP_INITIALIZER } from '../../actionsType';

// store
import { languageSelector } from '../../selectors';

const state = { ...appInitializerStateMock[APP_INITIALIZER], language: 'en' };

describe('languageSelector', () => {
  it('should return langauge', () => {
    // before
    const selectorFunction = (languageSelector as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual('en');
  });
});

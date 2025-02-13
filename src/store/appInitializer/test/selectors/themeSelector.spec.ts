// mocks
import { appInitializerStateMock } from 'test/mocks/reducer/appInitializerMock';

// others
import { REDUCER_KEY as APP_INITIALIZER } from '../../actionsType';

// store
import { themeSelector } from '../../selectors';

// types
import { Theme } from 'types/enums/theme';

const state = {
  ...appInitializerStateMock[APP_INITIALIZER],
  theme: Theme.dark,
};

describe('themeSelector', () => {
  it('should return langauge', () => {
    // before
    const selectorFunction = (themeSelector as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual(Theme.dark);
  });
});

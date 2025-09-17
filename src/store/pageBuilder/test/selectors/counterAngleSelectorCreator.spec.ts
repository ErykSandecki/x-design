// mocks
import {
  elementStaticDataMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_STATIC_DATA } from '../../constants';

// store
import { counterAngleSelectorCreator } from '../../selectors';

describe('counterAngleSelectorCreator', () => {
  it('should return counter angle', () => {
    // before
    const selectorFunction = (counterAngleSelectorCreator('2') as any)
      .resultFunc;

    // result
    expect(
      selectorFunction({
        [BASE_STATIC_DATA.id]: BASE_STATIC_DATA,
        [elementStaticDataMock.id]: {
          ...elementStaticDataMock,
          children: ['2'],
        },
        ['2']: {
          ...elementStaticDataMock,
          id: '2',
          parentId: selectedElementMock.id,
        },
      }),
    ).toBe(-0);
  });

  it('should return default angle', () => {
    // before
    const selectorFunction = (counterAngleSelectorCreator('-1') as any)
      .resultFunc;

    // result
    expect(selectorFunction({})).toBe(0);
  });
});

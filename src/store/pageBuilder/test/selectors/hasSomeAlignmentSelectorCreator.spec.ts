// mocks
import { alignmentMock, elementMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { hasSomeAlignmentSelectorCreator } from '../../selectors';

describe('hasSomeAlignmentSelectorCreator', () => {
  it('should has alignment', () => {
    // before
    const selectorFunction = (hasSomeAlignmentSelectorCreator('horizontal') as any).resultFunc;

    // result
    expect(
      selectorFunction(
        {
          [elementMock.id]: {
            ...elementMock,
            alignment: {
              ...alignmentMock,
            },
          },
        },
        [selectedElementMock],
      ),
    ).toBe(true);
  });
});

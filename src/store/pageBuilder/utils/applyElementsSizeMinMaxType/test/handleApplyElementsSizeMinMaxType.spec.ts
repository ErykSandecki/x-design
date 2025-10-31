import { noop } from 'lodash';

// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock, sizeMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// utils
import { handleApplyElementsSizeMinMaxType } from '../handleApplyElementsSizeMinMaxType';

describe('handleApplyElementsSizeMinMaxType', () => {
  beforeAll(() => {
    // mock
    document.getElementById = (): any => ({ querySelector: noop }) as any;
    window.getComputedStyle = (): any => ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;
  });

  it(`should apply fixed`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleApplyElementsSizeMinMaxType(
      { scoreType: 'min', sizeType: 'height', type: 'fixed' },
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              ...currentPage.elements,
              [elementMock.id]: {
                ...elementMock,
                height: {
                  ...sizeMock,
                  min: {
                    ...sizeMock,
                    value: 0,
                  },
                },
              },
            },
            selectedElements: [selectedElementMock],
          },
        },
      },
    );

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            [elementMock.id]: {
              ...elementMock,
              height: {
                ...sizeMock,
                min: {
                  ...sizeMock,
                  unit: undefined,
                  value: 100,
                },
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});

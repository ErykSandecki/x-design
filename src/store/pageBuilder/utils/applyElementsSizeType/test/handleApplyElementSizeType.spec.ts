import { noop } from 'lodash';

// mocks
import {
  elementMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// types
import { Unit } from 'types';

// utils
import { handleApplyElementsSizeType } from '../handleApplyElementsSizeType';

describe('handleApplyElementSizeType', () => {
  beforeAll(() => {
    // mock
    document.getElementById = (): any => ({ querySelector: noop }) as any;
    window.getComputedStyle = (): any => ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;
  });

  it(`should apply unit`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleApplyElementsSizeType(
      { sizeType: 'height', type: 'unit' },
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              ...currentPage.elements,
              allData: {
                ...currentPage.elements.allData,
                [elementMock.id]: elementMock,
              },
              dynamicData: {
                ...currentPage.elements.dynamicData,
                [elementDynamicDataMock.id]: elementDynamicDataMock,
              },
              staticData: {
                ...currentPage.elements.staticData,
                [elementStaticDataMock.id]: elementStaticDataMock,
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
            allData: {
              ...currentPage.elements.allData,
              [elementMock.id]: {
                ...elementMock,
                height: { unit: Unit.percentage, value: 100 },
              },
            },
            dynamicData: {
              ...currentPage.elements.dynamicData,
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                height: { unit: Unit.percentage, value: 100 },
              },
            },
            staticData: {
              ...currentPage.elements.staticData,
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});

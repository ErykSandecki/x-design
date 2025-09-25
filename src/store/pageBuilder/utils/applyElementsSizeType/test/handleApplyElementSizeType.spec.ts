import { noop } from 'lodash';

// mocks
import {
  elementAllDataMock,
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
import { handleApplyElementSizeType } from '../handleApplyElementSizeType';

describe('handleApplyElementSizeType', () => {
  beforeAll(() => {
    // mock
    document.getElementById = () => ({ querySelector: noop }) as any;
    window.getComputedStyle = () =>
      ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;
  });

  it(`should apply unit`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleApplyElementSizeType(
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
                [elementAllDataMock.id]: elementAllDataMock,
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
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
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

// mocks
import {
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handleSetElementsSizes } from '../handleSetElementsSizes';

describe('handleChangeLayout', () => {
  it(`should change height`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleSetElementsSizes(
      'height',
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
      'auto',
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
                height: { value: 'auto' },
              },
            },
            dynamicData: {
              ...currentPage.elements.dynamicData,
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                height: { value: 'auto' },
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

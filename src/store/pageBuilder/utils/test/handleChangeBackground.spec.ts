// mocks
import {
  backgroundMock,
  elementMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handleChangeBackground } from '../handleChangeBackground';

describe('handleChangeBackground', () => {
  it(`should return data with changed background`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleChangeBackground(
      {
        background: { ...backgroundMock[0], properties: { ...backgroundMock[0].properties, alpha: '0' } },
        id: 'test-1',
        index: 0,
      },
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
                background: [backgroundMock[0], backgroundMock[0]],
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
              background: [
                {
                  ...elementMock.background[0],
                  properties: {
                    ...elementMock.background[0].properties,
                    alpha: '0',
                  },
                },
                backgroundMock[0],
              ],
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it(`should return data with changed background for main parent`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleChangeBackground(
      {
        background: { ...backgroundMock[0], properties: { ...backgroundMock[0].properties, alpha: '0' } },
        id: '-1',
        index: 0,
      },
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              ...currentPage.elements,
              ['-1']: {
                ...currentPage.elements['-1'],
                background: [backgroundMock[0], backgroundMock[0]],
              },
            },
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
            ['-1']: {
              ...currentPage.elements['-1'],
              background: [
                {
                  ...currentPage.elements['-1'].background[0],
                  properties: {
                    ...currentPage.elements['-1'].background[0].properties,
                    alpha: '0',
                    color: '#ffffff',
                  },
                },
                backgroundMock[0],
              ],
            },
          },
          selectedElements: [],
        },
      },
    });
  });
});

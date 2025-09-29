// mocks
import {
  childrenMock,
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../../actionsType';

// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';

// utils
import { handleChangeAlignment } from '../handleChangeAlignment';

describe('handleChangeAlignment', () => {
  beforeEach(() => {
    // mock
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    const el3 = document.createElement('div');

    // before
    el1.setAttribute('id', selectedElementMock.id);
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.setAttribute('id', 'test-2');
    el2.style.height = '100px';
    el2.style.width = '100px';
    el3.setAttribute('id', 'test-3');
    el3.style.height = '100px';
    el3.style.width = '100px';
    document.body.appendChild(el1);
    document.body.appendChild(el2);
    document.body.appendChild(el3);
  });

  it(`should change alignment`, () => {
    // mock
    const alignment = {
      horizontal: AlignmentHorizontal.center,
      vertical: AlignmentVertical.center,
    };
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleChangeAlignment(
      {
        horizontal: AlignmentHorizontal.center,
        vertical: AlignmentVertical.center,
      },
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
                ['-1']: {
                  ...currentPage.elements.allData['-1'],
                  children: [childrenMock],
                },
                [elementAllDataMock.id]: {
                  ...elementAllDataMock,
                  children: [
                    { ...childrenMock, id: 'test-2' },
                    { ...childrenMock, id: 'test-3' },
                  ],
                  position: 'absolute',
                },
                ['test-2']: {
                  ...elementAllDataMock,
                  children: [],
                  id: 'test-2',
                  parentId: 'test-1',
                  position: 'absolute',
                },
                ['test-3']: {
                  ...elementAllDataMock,
                  children: [],
                  id: 'test-3',
                  parentId: 'test-1',
                  position: 'relative',
                },
              },
              dynamicData: {
                ...currentPage.elements.dynamicData,
                ...currentPage.elements.allData,
                [elementDynamicDataMock.id]: {
                  ...elementDynamicDataMock,
                  position: 'absolute',
                },
                ['test-2']: {
                  ...elementDynamicDataMock,
                  id: 'test-2',
                  position: 'absolute',
                },
                ['test-3']: {
                  ...elementDynamicDataMock,
                  id: 'test-3',
                  position: 'relative',
                },
              },
              staticData: {
                ...currentPage.elements.staticData,
                ['-1']: {
                  ...currentPage.elements.staticData['-1'],
                  children: [childrenMock],
                },
                [elementStaticDataMock.id]: {
                  ...elementStaticDataMock,
                  children: [
                    { ...childrenMock, id: 'test-2' },
                    { ...childrenMock, id: 'test-3' },
                  ],
                },
                ['test-2']: {
                  ...elementStaticDataMock,
                  children: [],
                  id: 'test-2',
                },
                ['test-3']: {
                  ...elementStaticDataMock,
                  children: [],
                  id: 'test-3',
                },
              },
            },
            selectedElements: [
              { ...selectedElementMock, id: 'test-2', parentId: 'test-1' },
              { ...selectedElementMock, id: 'test-3', parentId: 'test-1' },
            ],
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
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [childrenMock],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                children: [
                  { ...childrenMock, id: 'test-2' },
                  { ...childrenMock, id: 'test-3' },
                ],
                position: 'absolute',
              },
              ['test-2']: {
                ...elementAllDataMock,
                alignment,
                children: [],
                id: 'test-2',
                parentId: 'test-1',
                position: 'absolute',
              },
              ['test-3']: {
                ...elementAllDataMock,
                alignment,
                children: [],
                id: 'test-3',
                parentId: 'test-1',
                position: 'absolute',
              },
            },
            dynamicData: {
              ...currentPage.elements.dynamicData,
              ...currentPage.elements.allData,
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                position: 'absolute',
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                alignment,
                id: 'test-2',
                position: 'absolute',
              },
              ['test-3']: {
                ...elementDynamicDataMock,
                alignment,
                id: 'test-3',
                position: 'absolute',
              },
            },
            staticData: {
              ...currentPage.elements.staticData,
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [childrenMock],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: [
                  { ...childrenMock, id: 'test-2' },
                  { ...childrenMock, id: 'test-3' },
                ],
              },
              ['test-2']: {
                ...elementStaticDataMock,
                children: [],
                id: 'test-2',
              },
              ['test-3']: {
                ...elementStaticDataMock,
                children: [],
                id: 'test-3',
              },
            },
          },
          selectedElements: [
            { ...selectedElementMock, id: 'test-2', parentId: 'test-1' },
            { ...selectedElementMock, id: 'test-3', parentId: 'test-1' },
          ],
        },
      },
    });
  });
});

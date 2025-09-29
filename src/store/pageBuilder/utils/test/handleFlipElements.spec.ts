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
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// types
import { LayoutType } from 'types';

// utils
import { handleFlipElements } from '../handleFlipElements';
import { negateValue } from 'utils/math/negateValue';

describe('handleFlipElements', () => {
  it(`should flip elements for axis x`, () => {
    // mock
    const angle = 45;
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleFlipElements('x', {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [childrenMock],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle,
                children: [
                  { ...childrenMock, id: 'test-2' },
                  { ...childrenMock, id: 'test-3' },
                ],
                layout: {
                  type: LayoutType.horizontal,
                },
              },
              ['test-2']: {
                ...elementAllDataMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementAllDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
            dynamicData: {
              ['-1']: {
                ...currentPage.elements.dynamicData['-1'],
              },
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                angle,
                layout: {
                  type: LayoutType.horizontal,
                },
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                id: 'test-2',
              },
              ['test-3']: {
                ...elementDynamicDataMock,
                id: 'test-3',
              },
            },
            staticData: {
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
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementStaticDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [childrenMock],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle: negateValue(angle),
                children: [
                  { ...childrenMock, id: 'test-3' },
                  { ...childrenMock, id: 'test-2' },
                ],
                layout: {
                  type: LayoutType.horizontal,
                },
              },
              ['test-2']: {
                ...elementAllDataMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementAllDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
            dynamicData: {
              ['-1']: {
                ...currentPage.elements.dynamicData['-1'],
              },
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                angle: negateValue(angle),
                layout: {
                  type: LayoutType.horizontal,
                },
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                id: 'test-2',
              },
              ['test-3']: {
                ...elementDynamicDataMock,
                id: 'test-3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [childrenMock],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: [
                  { ...childrenMock, id: 'test-3' },
                  { ...childrenMock, id: 'test-2' },
                ],
              },
              ['test-2']: {
                ...elementStaticDataMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementStaticDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it(`should flip elements for axis x when grid`, () => {
    // mock
    const angle = 45;
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleFlipElements('x', {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [childrenMock],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle,
                children: [
                  { ...childrenMock, id: 'test-2' },
                  { ...childrenMock, id: 'test-3' },
                ],
                layout: {
                  type: LayoutType.grid,
                },
              },
              ['test-2']: {
                ...elementAllDataMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementAllDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
            dynamicData: {
              ['-1']: {
                ...currentPage.elements.dynamicData['-1'],
              },
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                angle,
                layout: {
                  type: LayoutType.grid,
                },
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                id: 'test-2',
              },
              ['test-3']: {
                ...elementDynamicDataMock,
                id: 'test-3',
              },
            },
            staticData: {
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
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementStaticDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [childrenMock],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle: negateValue(angle),
                children: [
                  { ...childrenMock, id: 'test-3' },
                  { ...childrenMock, id: 'test-2' },
                ],
                layout: {
                  type: LayoutType.grid,
                },
              },
              ['test-2']: {
                ...elementAllDataMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementAllDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
            dynamicData: {
              ['-1']: {
                ...currentPage.elements.dynamicData['-1'],
              },
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                angle: negateValue(angle),
                layout: {
                  type: LayoutType.grid,
                },
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                id: 'test-2',
              },
              ['test-3']: {
                ...elementDynamicDataMock,
                id: 'test-3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [childrenMock],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: [
                  { ...childrenMock, id: 'test-3' },
                  { ...childrenMock, id: 'test-2' },
                ],
              },
              ['test-2']: {
                ...elementStaticDataMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementStaticDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it(`should flip elements for axis y`, () => {
    // mock
    const angle = 45;
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleFlipElements('y', {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [childrenMock],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle,
                children: [
                  { ...childrenMock, id: 'test-2' },
                  { ...childrenMock, id: 'test-3' },
                ],
              },
              ['test-2']: {
                ...elementAllDataMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementAllDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
            dynamicData: {
              ['-1']: {
                ...currentPage.elements.dynamicData['-1'],
              },
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                angle,
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                id: 'test-2',
              },
              ['test-3']: {
                ...elementDynamicDataMock,
                id: 'test-3',
              },
            },
            staticData: {
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
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementStaticDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [childrenMock],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle: negateValue(angle),
                children: [
                  { ...childrenMock, id: 'test-3' },
                  { ...childrenMock, id: 'test-2' },
                ],
              },
              ['test-2']: {
                ...elementAllDataMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementAllDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
            dynamicData: {
              ['-1']: {
                ...currentPage.elements.dynamicData['-1'],
              },
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                angle: negateValue(angle),
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                id: 'test-2',
              },
              ['test-3']: {
                ...elementDynamicDataMock,
                id: 'test-3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [childrenMock],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: [
                  { ...childrenMock, id: 'test-3' },
                  { ...childrenMock, id: 'test-2' },
                ],
              },
              ['test-2']: {
                ...elementStaticDataMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementStaticDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it(`should flip elements for axis y when grid`, () => {
    // mock
    const angle = 45;
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleFlipElements('y', {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [childrenMock],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle,
                children: [
                  { ...childrenMock, id: 'test-2' },
                  { ...childrenMock, id: 'test-3' },
                ],
                layout: {
                  type: LayoutType.grid,
                },
              },
              ['test-2']: {
                ...elementAllDataMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementAllDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
            dynamicData: {
              ['-1']: {
                ...currentPage.elements.dynamicData['-1'],
              },
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                angle,
                layout: {
                  type: LayoutType.grid,
                },
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                id: 'test-2',
              },
              ['test-3']: {
                ...elementDynamicDataMock,
                id: 'test-3',
              },
            },
            staticData: {
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
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementStaticDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [childrenMock],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle: negateValue(angle),
                children: [
                  { ...childrenMock, id: 'test-3' },
                  { ...childrenMock, id: 'test-2' },
                ],
                layout: {
                  type: LayoutType.grid,
                },
              },
              ['test-2']: {
                ...elementAllDataMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementAllDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
            dynamicData: {
              ['-1']: {
                ...currentPage.elements.dynamicData['-1'],
              },
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                angle: negateValue(angle),
                layout: {
                  type: LayoutType.grid,
                },
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                id: 'test-2',
              },
              ['test-3']: {
                ...elementDynamicDataMock,
                id: 'test-3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [childrenMock],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: [
                  { ...childrenMock, id: 'test-3' },
                  { ...childrenMock, id: 'test-2' },
                ],
              },
              ['test-2']: {
                ...elementStaticDataMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementStaticDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });

  it(`should only change angle`, () => {
    // mock
    const angle = 45;
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleFlipElements('y', {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [childrenMock],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle,
                children: [
                  { ...childrenMock, id: 'test-2' },
                  { ...childrenMock, id: 'test-3' },
                ],
                layout: {
                  type: LayoutType.horizontal,
                },
              },
              ['test-2']: {
                ...elementAllDataMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementAllDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
            dynamicData: {
              ['-1']: {
                ...currentPage.elements.dynamicData['-1'],
              },
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                angle,
                layout: {
                  type: LayoutType.horizontal,
                },
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                id: 'test-2',
              },
              ['test-3']: {
                ...elementDynamicDataMock,
                id: 'test-3',
              },
            },
            staticData: {
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
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementStaticDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [childrenMock],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle: negateValue(angle),
                children: [
                  { ...childrenMock, id: 'test-2' },
                  { ...childrenMock, id: 'test-3' },
                ],
                layout: {
                  type: LayoutType.horizontal,
                },
              },
              ['test-2']: {
                ...elementAllDataMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementAllDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
            dynamicData: {
              ['-1']: {
                ...currentPage.elements.dynamicData['-1'],
              },
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                angle: negateValue(angle),
                layout: {
                  type: LayoutType.horizontal,
                },
              },
              ['test-2']: {
                ...elementDynamicDataMock,
                id: 'test-2',
              },
              ['test-3']: {
                ...elementDynamicDataMock,
                id: 'test-3',
              },
            },
            staticData: {
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
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementStaticDataMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});

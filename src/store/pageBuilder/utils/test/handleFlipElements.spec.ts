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
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle,
                children: ['2', '3'],
                layout: {
                  type: LayoutType.horizontal,
                },
              },
              ['2']: {
                ...elementAllDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementAllDataMock,
                id: '3',
                parentId: '1',
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
              ['2']: {
                ...elementDynamicDataMock,
                id: '2',
              },
              ['3']: {
                ...elementDynamicDataMock,
                id: '3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementStaticDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['2', '3'],
              },
              ['2']: {
                ...elementStaticDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementStaticDataMock,
                id: '3',
                parentId: '1',
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
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle: negateValue(angle),
                children: ['3', '2'],
                layout: {
                  type: LayoutType.horizontal,
                },
              },
              ['2']: {
                ...elementAllDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementAllDataMock,
                id: '3',
                parentId: '1',
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
              ['2']: {
                ...elementDynamicDataMock,
                id: '2',
              },
              ['3']: {
                ...elementDynamicDataMock,
                id: '3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementStaticDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['3', '2'],
              },
              ['2']: {
                ...elementStaticDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementStaticDataMock,
                id: '3',
                parentId: '1',
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
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle,
                children: ['2', '3'],
                layout: {
                  type: LayoutType.grid,
                },
              },
              ['2']: {
                ...elementAllDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementAllDataMock,
                id: '3',
                parentId: '1',
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
              ['2']: {
                ...elementDynamicDataMock,
                id: '2',
              },
              ['3']: {
                ...elementDynamicDataMock,
                id: '3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementStaticDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['2', '3'],
              },
              ['2']: {
                ...elementStaticDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementStaticDataMock,
                id: '3',
                parentId: '1',
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
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle: negateValue(angle),
                children: ['3', '2'],
                layout: {
                  type: LayoutType.grid,
                },
              },
              ['2']: {
                ...elementAllDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementAllDataMock,
                id: '3',
                parentId: '1',
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
              ['2']: {
                ...elementDynamicDataMock,
                id: '2',
              },
              ['3']: {
                ...elementDynamicDataMock,
                id: '3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementStaticDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['3', '2'],
              },
              ['2']: {
                ...elementStaticDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementStaticDataMock,
                id: '3',
                parentId: '1',
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
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle,
                children: ['2', '3'],
              },
              ['2']: {
                ...elementAllDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementAllDataMock,
                id: '3',
                parentId: '1',
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
              ['2']: {
                ...elementDynamicDataMock,
                id: '2',
              },
              ['3']: {
                ...elementDynamicDataMock,
                id: '3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementStaticDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['2', '3'],
              },
              ['2']: {
                ...elementStaticDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementStaticDataMock,
                id: '3',
                parentId: '1',
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
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle: negateValue(angle),
                children: ['3', '2'],
              },
              ['2']: {
                ...elementAllDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementAllDataMock,
                id: '3',
                parentId: '1',
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
              ['2']: {
                ...elementDynamicDataMock,
                id: '2',
              },
              ['3']: {
                ...elementDynamicDataMock,
                id: '3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementStaticDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['3', '2'],
              },
              ['2']: {
                ...elementStaticDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementStaticDataMock,
                id: '3',
                parentId: '1',
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
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle,
                children: ['2', '3'],
                layout: {
                  type: LayoutType.grid,
                },
              },
              ['2']: {
                ...elementAllDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementAllDataMock,
                id: '3',
                parentId: '1',
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
              ['2']: {
                ...elementDynamicDataMock,
                id: '2',
              },
              ['3']: {
                ...elementDynamicDataMock,
                id: '3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementStaticDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['2', '3'],
              },
              ['2']: {
                ...elementStaticDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementStaticDataMock,
                id: '3',
                parentId: '1',
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
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle: negateValue(angle),
                children: ['3', '2'],
                layout: {
                  type: LayoutType.grid,
                },
              },
              ['2']: {
                ...elementAllDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementAllDataMock,
                id: '3',
                parentId: '1',
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
              ['2']: {
                ...elementDynamicDataMock,
                id: '2',
              },
              ['3']: {
                ...elementDynamicDataMock,
                id: '3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementStaticDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['3', '2'],
              },
              ['2']: {
                ...elementStaticDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementStaticDataMock,
                id: '3',
                parentId: '1',
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
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle,
                children: ['2', '3'],
                layout: {
                  type: LayoutType.horizontal,
                },
              },
              ['2']: {
                ...elementAllDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementAllDataMock,
                id: '3',
                parentId: '1',
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
              ['2']: {
                ...elementDynamicDataMock,
                id: '2',
              },
              ['3']: {
                ...elementDynamicDataMock,
                id: '3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementStaticDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['2', '3'],
              },
              ['2']: {
                ...elementStaticDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementStaticDataMock,
                id: '3',
                parentId: '1',
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
                children: [elementAllDataMock.id],
              },
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                angle: negateValue(angle),
                children: ['2', '3'],
                layout: {
                  type: LayoutType.horizontal,
                },
              },
              ['2']: {
                ...elementAllDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementAllDataMock,
                id: '3',
                parentId: '1',
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
              ['2']: {
                ...elementDynamicDataMock,
                id: '2',
              },
              ['3']: {
                ...elementDynamicDataMock,
                id: '3',
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
                children: [elementStaticDataMock.id],
              },
              [elementStaticDataMock.id]: {
                ...elementStaticDataMock,
                children: ['2', '3'],
              },
              ['2']: {
                ...elementStaticDataMock,
                id: '2',
                parentId: '1',
              },
              ['3']: {
                ...elementStaticDataMock,
                id: '3',
                parentId: '1',
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});

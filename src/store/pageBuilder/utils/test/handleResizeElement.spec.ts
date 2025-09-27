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
import { AnchorResize } from 'store/pageBuilder/enums';

// utils
import { handleResizeElement } from '../handleResizeElement';

const baseCoordinates = { x1: 0, x2: 100, y1: 0, y2: 100 };
const mouseCoordinates = { x: 200, y: 100 };

describe('handleResizeElement', () => {
  it(`should handle set element sizes`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleResizeElement(baseCoordinates, 100, 100, selectedElementMock.id, mouseCoordinates, {
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...pageBuilderStateMock[PAGE_BUILDER].events,
        selectedAnchorResize: AnchorResize.east,
      },
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              [elementAllDataMock.id]: elementAllDataMock,
            },
            dynamicData: {
              [elementDynamicDataMock.id]: elementDynamicDataMock,
            },
            staticData: {
              [elementStaticDataMock.id]: elementStaticDataMock,
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...pageBuilderStateMock[PAGE_BUILDER].events,
        selectedAnchorResize: AnchorResize.east,
      },
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,

        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              [elementAllDataMock.id]: {
                ...elementAllDataMock,
                height: { value: 100 },
                position: 'absolute',
                width: { value: 300 },
              },
            },
            dynamicData: {
              [elementDynamicDataMock.id]: {
                ...elementDynamicDataMock,
                height: { value: 100 },
                position: 'absolute',
                width: { value: 300 },
              },
            },
            staticData: {
              [elementStaticDataMock.id]: elementStaticDataMock,
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});

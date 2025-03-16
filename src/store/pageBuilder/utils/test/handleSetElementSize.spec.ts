// mocks
import {
  allDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// types
import { Anchor } from 'store/pageBuilder/enums';

// utils
import { handleSetElementSizes } from '../handleSetElementSize';

const baseCoordinates = { x1: 0, x2: 100, y1: 0, y2: 100 };
const mouseCoordinates = { x: 200, y: 100 };

describe('handleSetElementSizes', () => {
  it(`should handle set element sizes`, () => {
    // before
    const result = handleSetElementSizes(
      baseCoordinates,
      100,
      100,
      selectedElementMock.id,
      mouseCoordinates,
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        elements: {
          allData: {
            [allDataMock.id]: allDataMock,
          },
          dynamicData: { [elementDynamicDataMock.id]: elementDynamicDataMock },
          staticData: {
            [elementStaticDataMock.id]: elementStaticDataMock,
          },
        },
        events: {
          ...pageBuilderStateMock[PAGE_BUILDER].events,
          selectedAnchor: Anchor.east,
        },
        selectedElements: {
          [selectedElementMock.id]: selectedElementMock,
        },
      },
    );

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        allData: {
          [allDataMock.id]: {
            ...allDataMock,
            height: 100,
            positionAbsolute: { x: 0, y: 0 },
            width: 300,
          },
        },
        dynamicData: {
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
            height: 100,
            positionAbsolute: { x: 0, y: 0 },
            width: 300,
          },
        },
        staticData: {
          [elementStaticDataMock.id]: elementStaticDataMock,
        },
      },
      events: {
        ...pageBuilderStateMock[PAGE_BUILDER].events,
        selectedAnchor: Anchor.east,
      },
      selectedElements: {
        [selectedElementMock.id]: selectedElementMock,
      },
    });
  });
});

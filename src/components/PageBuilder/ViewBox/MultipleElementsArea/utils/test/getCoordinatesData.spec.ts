// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';

// others
import { BASE_RECT } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store/store';

// utils
import { getCoordinatesData } from '../getCoordinatesData';

const element = document.createElement('div');
const zoomContent = document.createElement('div');
const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages[pageBuilderStateMock[PAGE_BUILDER].currentPage];

const itemsRefs = {
  [selectedElementMock.id]: element,
  ['test-2']: element,
};

describe('getCoordinatesData', () => {
  beforeAll(() => {
    // mock
    element.style.height = '100px';
    element.style.width = '100px';
    zoomContent.style.height = '1000px';
    zoomContent.style.width = '1000px';
    storeToMock.getState = (): any =>
      ({
        ...wholeStateMock,
        [PAGE_BUILDER]: {
          ...pageBuilderStateMock[PAGE_BUILDER],
          pages: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages,
            [currentPage.id]: {
              ...currentPage,
              elements: {
                ...currentPage.elements,
                [selectedElementMock.id]: {
                  ...elementMock,
                },
                ['test-2']: {
                  ...elementMock,
                  id: 'test-2',
                },
              },
            },
          },
        },
      }) as any;
  });

  it(`should return getCoordinatesData`, () => {
    // before
    const result = getCoordinatesData(
      false,
      itemsRefs,
      [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
      { current: zoomContent },
    );

    // result
    expect(result).toStrictEqual({
      elementsCoordinates: [
        { coordinates: { x1: 0, x2: 100, y1: 0, y2: 100 }, id: 'test-1' },
        { coordinates: { x1: 0, x2: 100, y1: 0, y2: 100 }, id: 'test-2' },
      ],
      outline: { x1: -0.75, x2: 100.75, y1: -0.75, y2: 100.75 },
    });
  });

  it(`should return default data`, () => {
    // before
    const result = getCoordinatesData(true, itemsRefs, [selectedElementMock], {
      current: zoomContent,
    });

    // result
    expect(result).toStrictEqual({
      elementsCoordinates: [],
      outline: BASE_RECT,
    });
  });
});

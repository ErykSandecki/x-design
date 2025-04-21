// mocks
import {
  elementAllDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';

// others
import { BASE_RECT } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store/store';

// utils
import { getCoordinatesData } from '../getCoordinatesData';

const element = document.createElement('div');
const currentPage =
  pageBuilderStateMock[PAGE_BUILDER].pages[
    pageBuilderStateMock[PAGE_BUILDER].currentPage
  ];

const sharedRefs = {
  [selectedElementMock.id]: element,
  ['2']: element,
};

describe('calculateBoxSize', () => {
  beforeAll(() => {
    // mock
    element.style.height = '100px';
    element.style.width = '100px';
    storeToMock.getState = () =>
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
                allData: {
                  ...currentPage.elements.allData,
                  [selectedElementMock.id]: {
                    ...elementAllDataMock,
                  },
                  ['2']: {
                    ...elementAllDataMock,
                    id: '2',
                  },
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
      [selectedElementMock, { ...selectedElementMock, id: '2' }],
      sharedRefs,
    );

    // result
    expect(result).toStrictEqual({
      elementsCordinates: [
        { coordinates: { x1: 0, x2: 100, y1: 0, y2: 100 }, id: '1' },
        { coordinates: { x1: 0, x2: 100, y1: 0, y2: 100 }, id: '2' },
      ],
      outline: { x1: -0.75, x2: 100.75, y1: -0.75, y2: 100.75 },
    });
  });

  it(`should return default data`, () => {
    // before
    const result = getCoordinatesData(true, [selectedElementMock], sharedRefs);

    // result
    expect(result).toStrictEqual({
      elementsCordinates: [],
      outline: BASE_RECT,
    });
  });
});

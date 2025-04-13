// mocks
import {
  elementAllDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_RECT } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store/store';

// utils
import { getCollidedElements } from '../getCollidedElements';

const stateMock = {
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    elements: {
      allData: {
        [elementAllDataMock.id]: elementAllDataMock,
      },
    },
  },
};

describe('getCollidedElements', () => {
  beforeAll(() => {
    storeToMock.getState = () => stateMock as any;
  });

  it(`should return collided elements`, () => {
    // before
    const result = getCollidedElements({ x1: 0, x2: 100, y1: 0, y2: 100 });

    // result
    expect(result).toStrictEqual([
      {
        ...selectedElementMock,
        coordinates: {
          ...selectedElementMock.coordinates,
          x2: 100,
          y2: 100,
        },
      },
    ]);
  });

  it(`should return empty data`, () => {
    // before
    const result = getCollidedElements(BASE_RECT);

    // result
    expect(result).toStrictEqual([]);
  });
});

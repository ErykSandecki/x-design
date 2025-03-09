// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_3D } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// store
import { areaCoordinatesSelector } from '../../selectors';

const state = pageBuilderStateMock[PAGE_BUILDER];

describe('areaCoordinatesSelector', () => {
  it('should return coordinates', () => {
    // before
    const selectorFunction = (areaCoordinatesSelector as any).resultFunc;

    // result
    expect(selectorFunction(state)).toStrictEqual(BASE_3D);
  });
});

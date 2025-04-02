// mocks
import {
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handleSetElementCoordinates } from '../handleSetElementCoordinates';

describe('handleSetElementCoordinates', () => {
  it(`should return data with changed element coordinates`, () => {
    // mock
    const position = { x: 100, y: 100 };

    // before
    const result = handleSetElementCoordinates(
      elementAllDataMock.id,
      position,
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
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
      },
    );

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements,
        allData: {
          [elementAllDataMock.id]: {
            ...elementAllDataMock,
            position,
          },
        },
        dynamicData: {
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
            position,
          },
        },
        staticData: {
          [elementStaticDataMock.id]: elementStaticDataMock,
        },
      },
    });
  });
});

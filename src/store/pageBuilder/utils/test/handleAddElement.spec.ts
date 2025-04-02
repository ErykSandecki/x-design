// mocks
import {
  createFrameMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handleAddElement } from '../handleAddElement';

describe('handleAddElement', () => {
  it(`should return data with added element`, () => {
    // before
    const result = handleAddElement(
      createFrameMock,
      pageBuilderStateMock[PAGE_BUILDER],
    );

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        allData: {
          [createFrameMock.id]: createFrameMock,
        },
        dynamicData: {
          [createFrameMock.id]: {
            height: createFrameMock.height,
            id: createFrameMock.id,
            position: createFrameMock.position,
            rotate: createFrameMock.rotate,
            width: createFrameMock.width,
          },
        },
        staticData: {
          [createFrameMock.id]: {
            id: createFrameMock.id,
            index: createFrameMock.index,
            parentId: createFrameMock.parentId,
            type: createFrameMock.type,
          },
        },
      },
    });
  });
});

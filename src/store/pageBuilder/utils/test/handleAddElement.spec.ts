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
        dynamicData: [
          {
            height: createFrameMock.height,
            id: createFrameMock.id,
            positionAbsolute: createFrameMock.positionAbsolute,
            positionRelative: createFrameMock.positionRelative,
            rotate: createFrameMock.rotate,
            width: createFrameMock.width,
          },
        ],
        staticData: [
          {
            id: createFrameMock.id,
            parentId: createFrameMock.parentId,
            type: createFrameMock.type,
          },
        ],
      },
    });
  });
});

// mocks
import {
  createFrameMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../actionsType';

// store
import pageBuilder from '../reducer';
import { addElement } from '../actions';

// types
import { TAction } from 'types';
import { TPageBuilderState } from '../types';

describe('PageBuilderReducer', () => {
  const reducer = (action: TAction, initialState = {}): TPageBuilderState =>
    pageBuilder(initialState as TPageBuilderState, action);

  it('should return default state', () => {
    // before
    const state = pageBuilder(
      { ...pageBuilderStateMock[PAGE_BUILDER] },
      { type: '' },
    );

    // result
    expect(state).toEqual(pageBuilderStateMock[PAGE_BUILDER]);
  });

  it('should handle ADD_ELEMENT', () => {
    // before
    const state = reducer(addElement(createFrameMock), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
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

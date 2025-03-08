// mocks
import {
  createFrameMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../actionsType';

// store
import pageBuilder from '../reducer';
import {
  addElement,
  selectElement,
  unselectElement,
  selectElements,
} from '../actions';

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
        allData: {
          [createFrameMock.id]: createFrameMock,
        },
        dynamicData: {
          [createFrameMock.id]: {
            height: createFrameMock.height,
            id: createFrameMock.id,
            positionAbsolute: createFrameMock.positionAbsolute,
            positionRelative: createFrameMock.positionRelative,
            rotate: createFrameMock.rotate,
            width: createFrameMock.width,
          },
        },
        staticData: {
          [createFrameMock.id]: {
            id: createFrameMock.id,
            index: 0,
            parentId: createFrameMock.parentId,
            type: createFrameMock.type,
          },
        },
      },
    });
  });

  it('should handle SELECT_ELEMENT', () => {
    // mock
    const id = selectedElementMock.id;

    // before
    const state = reducer(selectElement(selectedElementMock), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      selectedElements: { [id]: selectedElementMock },
    });
  });

  it('should handle SELECT_ELEMENTS', () => {
    // mock
    const id = selectedElementMock.id;

    // before
    const state = reducer(selectElements({ [id]: selectedElementMock }), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      selectedElements: { [id]: selectedElementMock },
    });
  });

  it('should handle UNSELECT_ELEMENT', () => {
    // mock
    const id = selectedElementMock.id;

    // before
    const state = reducer(unselectElement(id), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      selectedElements: { [id]: selectedElementMock },
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
    });
  });
});

import { renderHook } from '@testing-library/react';

// mocks
import {
  eventsMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseEnterEvent } from '../useMouseEnterEvent';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store/store';

// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';
import { MouseMode } from 'types/enums/mouseMode';

const mockCallBack = jest.fn();
const stateMock = {
  ...pageBuilderStateMock,
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

describe('useMouseEnterEvent', () => {
  it(`should trigger event when top anchor`, () => {
    // mock
    storeToMock.getState = () =>
      ({
        ...stateMock,
        [PAGE_BUILDER]: {
          ...stateMock[PAGE_BUILDER],
          events: {
            ...eventsMock,
            draggableElements: ['1'],
          },
        },
      }) as any;

    // before
    const { result } = renderHook(() =>
      useMouseEnterEvent('1', MouseMode.default),
    );

    // action
    result.current(DropAnchorsPosition.top);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      possibleAnchorElementId: '1',
      possibleAnchorPosition: DropAnchorsPosition.top,
    });
  });

  it(`should trigger event when bottom anchor`, () => {
    // mock
    storeToMock.getState = () =>
      ({
        ...stateMock,
        [PAGE_BUILDER]: {
          ...stateMock[PAGE_BUILDER],
          events: {
            ...eventsMock,
            draggableElements: ['1'],
          },
        },
      }) as any;

    // before
    const { result } = renderHook(() =>
      useMouseEnterEvent('1', MouseMode.default),
    );

    // action
    result.current(DropAnchorsPosition.bottom);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      possibleAnchorElementId: '1',
      possibleAnchorPosition: DropAnchorsPosition.bottom,
    });
  });

  it(`should not trigger event when empty selected elements`, () => {
    // mock
    storeToMock.getState = () =>
      ({
        ...stateMock,
        [PAGE_BUILDER]: {
          ...stateMock[PAGE_BUILDER],
          events: {
            ...eventsMock,
          },
        },
      }) as any;

    // before
    const { result } = renderHook(() =>
      useMouseEnterEvent('1', MouseMode.default),
    );

    // action
    result.current(DropAnchorsPosition.bottom);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it(`should not trigger when mouse mode is different`, () => {
    // mock
    storeToMock.getState = () =>
      ({
        ...stateMock,
        [PAGE_BUILDER]: {
          ...stateMock[PAGE_BUILDER],
          events: {
            ...eventsMock,
          },
        },
      }) as any;

    // before
    const { result } = renderHook(() =>
      useMouseEnterEvent('1', MouseMode.comment),
    );

    // action
    result.current(DropAnchorsPosition.bottom);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});

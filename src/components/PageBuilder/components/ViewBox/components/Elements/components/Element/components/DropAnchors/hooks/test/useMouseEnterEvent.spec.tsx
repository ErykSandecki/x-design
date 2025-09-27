import { renderHook } from '@testing-library/react';

// mocks
import { eventsMock, pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

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
  useDispatch: (): any => mockCallBack,
}));

describe('useMouseEnterEvent', () => {
  it(`should trigger event when top anchor`, () => {
    // mock
    storeToMock.getState = (): any =>
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
    const { result } = renderHook(() => useMouseEnterEvent('1', 0, MouseMode.default, '-1'));

    // action
    result.current(DropAnchorsPosition.top);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      possibleAnchorElementId: '1',
      possibleAnchorPosition: DropAnchorsPosition.top,
      possibleIndexPosition: 0,
      possibleParent: '-1',
    });
  });

  it(`should trigger event when bottom anchor`, () => {
    // mock
    storeToMock.getState = (): any =>
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
    const { result } = renderHook(() => useMouseEnterEvent('1', 0, MouseMode.default, '-1'));

    // action
    result.current(DropAnchorsPosition.bottom);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      possibleAnchorElementId: '1',
      possibleAnchorPosition: DropAnchorsPosition.bottom,
      possibleIndexPosition: 1,
      possibleParent: '-1',
    });
  });

  it(`should not trigger event when empty selected elements`, () => {
    // mock
    storeToMock.getState = (): any =>
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
    const { result } = renderHook(() => useMouseEnterEvent('1', 0, MouseMode.default, '-1'));

    // action
    result.current(DropAnchorsPosition.bottom);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it(`should not trigger when mouse mode is different`, () => {
    // mock
    storeToMock.getState = (): any =>
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
    const { result } = renderHook(() => useMouseEnterEvent('1', 0, MouseMode.comment, '-1'));

    // action
    result.current(DropAnchorsPosition.bottom);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});

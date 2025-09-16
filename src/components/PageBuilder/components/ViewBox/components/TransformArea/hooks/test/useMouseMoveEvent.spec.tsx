import { fireEvent, renderHook } from '@testing-library/react';
import { RefObject } from 'react';

// mocks
import {
  eventsMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseMoveEvent } from '../useMouseMoveEvent';

// others
import { BASE_2D } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store';

// types
import { AnchorResize } from 'store/pageBuilder/enums';
import { T2DCoordinates } from 'types';

// utils
import { getProviderWrapper } from 'test';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();
const stateMock = {
  ...pageBuilderStateMock,
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    events: {
      ...eventsMock,
      selectedAnchorResize: AnchorResize.east,
    },
  },
};

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: (callback) => callback,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

describe('useMouseMoveEvent', () => {
  it(`should trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(
      () =>
        useMouseMoveEvent(
          cursorPosition,
          100,
          selectedElementMock.id,
          100,
          0,
          0,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.mouseMove(window, {});

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      baseCoordinates: { x1: 0, x2: 100, y1: 0, y2: 100 },
      height: 100,
      id: '1',
      mouseCoordinates: { x: 0, y: 0 },
      width: 100,
    });
  });

  it(`should not trigger event`, () => {
    // mock
    const store = configureStore({
      ...pageBuilderStateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          selectedAnchorResize: AnchorResize.none,
        },
      },
    });

    // before
    renderHook(
      () =>
        useMouseMoveEvent(
          cursorPosition,
          100,
          selectedElementMock.id,
          100,
          0,
          0,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.mouseMove(window, {});

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});

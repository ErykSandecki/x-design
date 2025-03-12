import { fireEvent, renderHook } from '@testing-library/react';
import { RefObject } from 'react';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseMoveEvent } from '../useMouseMoveEvent';

// others
import { BASE_2D } from 'shared';

// store
import { configureStore } from 'store';

// types
import { MouseMode } from 'components/PageBuilder/enums';
import { T2DCoordinates } from 'types';

// utils
import { getProviderWrapper } from 'test';

const mockCallBack = jest.fn();
const ref = { current: BASE_2D } as RefObject<T2DCoordinates>;
const stateMock = {
  ...pageBuilderStateMock,
};

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  throttle: (callback) => callback,
}));

describe('useMouseMoveEvent', () => {
  it(`should trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(
      () =>
        useMouseMoveEvent(
          ref,
          '-1',
          false,
          false,
          true,
          MouseMode.default,
          BASE_2D,
          mockCallBack,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.mouseMove(window, {});

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(true);
  });

  it(`should not trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(
      () =>
        useMouseMoveEvent(
          ref,
          '-1',
          false,
          false,
          false,
          MouseMode.default,
          BASE_2D,
          mockCallBack,
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

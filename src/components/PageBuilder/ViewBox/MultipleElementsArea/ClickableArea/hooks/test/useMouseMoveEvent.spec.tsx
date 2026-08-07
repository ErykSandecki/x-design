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

// utils
import { getProviderWrapper } from 'test';

const cursorPosition = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = vi.fn();
const stateMock = {
  ...pageBuilderStateMock,
};

vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
  useDispatch: () => (): any => {},
}));

vi.mock('../../../../utils/setElementsCoordinatesHandler', () => ({
  setElementsCoordinatesHandler: (): any => mockCallBack(),
}));

describe('useMouseMoveEvent', () => {
  it(`should trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(() => useMouseMoveEvent(cursorPosition, true, mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.mouseMove(window);

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it(`should not trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(() => useMouseMoveEvent(cursorPosition, false, mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.mouseMove(window);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});

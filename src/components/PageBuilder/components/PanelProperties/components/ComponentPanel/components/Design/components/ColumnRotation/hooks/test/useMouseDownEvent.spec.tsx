import { renderHook } from '@testing-library/react';

// hooks
import { useMouseDownEvent } from '../useMouseDownEvent';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

describe('useMouseDownEvent', () => {
  it(`should trigger mouse down event`, () => {
    // before
    const { result } = renderHook(() => useMouseDownEvent());

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      isRotating: true,
    });
  });
});

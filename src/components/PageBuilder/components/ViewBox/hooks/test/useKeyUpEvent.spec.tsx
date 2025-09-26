import { renderHook } from '@testing-library/react';

// hooks
import { useKeyUpEvent } from '../useKeyUpEvent';

// types
import { KeyboardKeys } from 'types';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useKeyUpEvent', () => {
  it(`should trigger event`, () => {
    // before
    const { result } = renderHook(() => useKeyUpEvent());

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      pressedKey: KeyboardKeys.none,
    });
  });
});

import { renderHook } from '@testing-library/react';

// hooks
import { useKeyUpEvent } from '../useKeyUpEvent';

// types
import { KeyboardKeys } from 'types';

const mockCallBack = vi.fn();

vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
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
